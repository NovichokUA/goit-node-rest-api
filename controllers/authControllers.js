import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { getGlobals } from "common-es";
import * as path from "path";
import * as fs from "fs/promises";
import Jimp from "jimp";
// import HttpError from "../helpers/HttpError.js";
import { randomUUID } from "crypto";
import mail from "../mail.js";

const { __dirname } = getGlobals(import.meta.url);

const avatarDir = path.join(__dirname, "../", "public", "avatars");

export const register = async (req, res, next) => {
  const { META_USERNAME, BASE_URL } = process.env;

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      return res.status(409).json({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const verificationToken = randomUUID();

    const result = await User.create({
      ...req.body,
      email,
      password: passwordHash,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      from: "zubr7333@gmail.com",
      subject: "Сonfirm your registration",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to confirm your registration</a>`,
      text: `Сonfirm your registration please open href="http://localhost:8000/users/verify/${verificationToken}`,
    };

    mail.sendMail(verifyEmail);

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (user.verify === false) {
      return res.status(401).json({ message: "Please verify your email." });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Please select a file for your avatar and try again." });
  }

  const { id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  const img = await Jimp.read(tempUpload);

  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (user === null) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerify = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verifyEmail = {
      to: email,
      from: "zubr7333@gmail.com",
      subject: "Сonfirm your registration",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click to confirm your registration</a>`,
      text: `Сonfirm your registration please open href="http://localhost:8000/users/verify/${verificationToken}`,
    };

    mail.sendMail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

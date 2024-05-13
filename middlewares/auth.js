import jwt, { decode } from "jsonwebtoken";

import User from "../db/models/User.js";

const auth = async (req, res, next) => {
  const authurizationHeader = req.headers.authorization;

  if (typeof authurizationHeader === "undefined") {
    return res.status(401).json({ message: "Not authorized" });
  }

  const [bearer, token] = authurizationHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    }

    try {
      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).json({ message: "Not authorized" });
      }

      if (user.token !== token) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      };

      next();
    } catch (error) {
      next(error);
    }
  });
};

export default auth;

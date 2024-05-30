import express from "express";

import {
  getCurrentUser,
  login,
  logout,
  register,
  updateAvatar,
  verifyEmail,
} from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { createUserSchema } from "../schemas/userSchema.js";

import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post(
  "/register",
  jsonParser,
  validateBody(createUserSchema),
  register
);

authRouter.post("/login", jsonParser, validateBody(createUserSchema), login);

authRouter.post("/logout", auth, logout);

authRouter.get("/current", auth, getCurrentUser);

authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

authRouter.get("/verify/:verificationToken", verifyEmail);

export default authRouter;

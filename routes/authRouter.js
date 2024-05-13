import express from "express";

import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { createUserSchema } from "../schemas/userSchema.js";

import auth from "../middlewares/auth.js";

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

export default authRouter;

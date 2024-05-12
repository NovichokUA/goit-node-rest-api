import express from "express";
import { login, register } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema } from "../schemas/userSchema.js";

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post(
  "/register",
  jsonParser,
  validateBody(createUserSchema),
  register
);

authRouter.post("/login", jsonParser, login);

export default authRouter;

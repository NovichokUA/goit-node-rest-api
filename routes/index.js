import express from "express";

import authRouter from "./authRouter.js";

import contactsRouter from "./contactsRouter.js";

import authMiddelware from "../middlewares/auth.js";

const router = express.Router();

router.use("/api/contacts", authMiddelware, contactsRouter);
router.use("/users", authRouter);

export default router;

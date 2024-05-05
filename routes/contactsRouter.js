import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { validateId } from "../middlewares/validareId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.post("/", createContact);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", validateId, deleteContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;

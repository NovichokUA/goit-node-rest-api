import express from "express";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import { validateId } from "../middlewares/validareId.js";

import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  updateFavoriteSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.get("/:id", validateId, getOneContact);

contactsRouter.delete("/:id", validateId, deleteContact);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorites",
  validateId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;

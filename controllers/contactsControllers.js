import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  upgradeContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const allContacts = await listContacts();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const oneContact = await getContactById(id);

  if (oneContact) {
    res.status(200).json(oneContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleteOneContact = await removeContact(id);

  if (deleteOneContact) {
    res.status(200).json(deleteOneContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = createContactSchema.validate({ name, email, phone });
    if (typeof error !== "undefined") {
      return res.status(400).json({ message: error.message });
    }
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { id } = req.params;
    const contactUpdate = await upgradeContact(id, req.body);

    if (!contactUpdate) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
};

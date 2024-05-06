import HttpError from "../helpers/HttpError.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  upgradeContact,
  upgradeStatusContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const result = await listContacts();

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const createContact = async (req, res) => {
  const { body } = req;
  const result = await addContact(body);
  res.status(201).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await upgradeContact(id, body, { new: true });

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await upgradeStatusContact(id, favorite);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

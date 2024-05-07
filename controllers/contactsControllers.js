import HttpError from "../helpers/HttpError.js";
import { wrapperError } from "../helpers/Wrapper.js";

import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  upgradeContact,
  upgradeStatusContact,
} from "../services/contactsServices.js";

export const getAllContacts = wrapperError(async (_, res) => {
  const result = await listContacts();

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const createContact = wrapperError(async (req, res) => {
  const { body } = req;
  const result = await addContact(body);
  res.status(201).json(result);
});

export const getOneContact = wrapperError(async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const deleteContact = wrapperError(async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const updateContact = wrapperError(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const result = await upgradeContact(id, body, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  const newContact = await getContactById(id);

  res.json(newContact);
});

export const updateStatusContact = wrapperError(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await upgradeStatusContact(id, { favorite }, { new: true });

  if (!result) {
    throw HttpError(404);
  }

  const newStatusContact = await getContactById(id);

  res.json(newStatusContact);
});

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

export const getAllContacts = wrapperError(async (req, res) => {
  const ownerId = req.user.id;

  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  const result = await listContacts({ owner: ownerId }).skip(skip).limit(limit);

  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
});

export const createContact = wrapperError(async (req, res) => {
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
    owner: req.user.id,
  };

  // const { body } = req;
  const result = await addContact(newContact);
  res.status(201).json(result);
});

export const getOneContact = wrapperError(async (req, res) => {
  const { id } = req.params;

  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404);
  }

  // if (result.owner.toString() !== req.user.id.toString()) {
  //   throw HttpError(404);
  // }

  if (!req.user.id.equals(result.owner)) {
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

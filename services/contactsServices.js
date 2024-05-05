import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";
import Contact from "../db/models/Contact.js";

// const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = () => Contact.find();

export const addContact = (dataContact) => Contact.create(dataContact);

export const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  return contactById || null;
};

export const removeContact = (contactId) => Contact.findOneAndDelete(contactId);

export async function upgradeContact(id, data) {
  Contact.findByIdAndUpdate(id, data);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const updContact = { ...contacts[index], ...data };
  contacts[index] = updContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updContact;
}

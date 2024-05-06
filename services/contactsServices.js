import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.find();

export const addContact = (dataContact) => Contact.create(dataContact);

export const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId);
  return contactById || null;
};

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const upgradeContact = async (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const upgradeStatusContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

import { getContactById } from "../services/contactsServices.js";
import HttpError from "./HttpError.js";

export const owner = async (req) => {
  const { id } = req.params;

  const result = await getContactById(id);

  if (!req.user.id.equals(result.owner)) {
    throw HttpError(404);
  }
};

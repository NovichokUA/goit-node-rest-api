import { isValidObjectId } from "mongoose";

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(404).json({ message: "Id is not validate" });
  }

  next();
};

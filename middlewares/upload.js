import multer from "multer";
import * as path from "path";

import { getGlobals } from "common-es";

const { __dirname } = getGlobals(import.meta.url);

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});

import multer, { Multer } from "multer";
const upload: Multer = multer({ dest: "uploads/" });

export { upload };
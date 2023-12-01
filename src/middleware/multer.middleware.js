import multer from "multer";
import fs from "fs";

const destinationFolder = "../public/temp";

if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const loggingMiddleware = (req, res, next) => {
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);
  next();
};

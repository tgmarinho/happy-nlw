import multer from 'multer';
import path from 'path';
import crypto from "crypto";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import { Request } from 'express'

export interface CustomFile extends Express.Multer.File {
  key: string
}

const storageTypes = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file: CustomFile, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.originalname);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME || "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  }),
};


const storage = process.env.NODE_ENV === 'prod' ? storageTypes.s3 : storageTypes.storage

export default {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req: Request, file: CustomFile, cb: any) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};
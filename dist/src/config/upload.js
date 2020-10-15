"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const storageTypes = {
    storage: multer_1.default.diskStorage({
        destination: path_1.default.join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err, file.originalname);
                file.key = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, file.key);
            });
        }
    }),
    s3: multer_s3_1.default({
        s3: new aws_sdk_1.default.S3(),
        bucket: process.env.BUCKET_NAME || "",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto_1.default.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);
                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    }),
};
const storage = process.env.NODE_ENV === 'prod' ? storageTypes.s3 : storageTypes.storage;
exports.default = {
    dest: path_1.default.resolve(__dirname, "..", "..", "uploads"),
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type."));
        }
    }
};

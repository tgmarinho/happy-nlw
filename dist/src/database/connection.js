"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const extFile = process.env.NODE_ENV == 'prod' ? 'js' : 'ts';
typeorm_1.createConnection({
    type: "mongodb",
    url: process.env.MONGODB_URI,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
    entities: [path_1.default.resolve(__dirname, '..', `models/*.${extFile}`)]
});

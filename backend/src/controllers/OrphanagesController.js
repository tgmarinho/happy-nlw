"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const mongodb_1 = require("mongodb");
const orphanages_view_1 = __importDefault(require("../views/orphanages_view"));
const Orphanage_1 = __importDefault(require("../models/Orphanage"));
exports.default = {
    async index(request, response) {
        const orphanagesRepository = typeorm_1.getMongoManager();
        const orphanages = await orphanagesRepository.find(Orphanage_1.default, {});
        return response.json(orphanages_view_1.default.renderMany(orphanages));
    },
    async show(request, response) {
        const { id } = request.params;
        try {
            const orphanagesRepository = typeorm_1.getMongoManager();
            const orphanage = await orphanagesRepository.findOne(Orphanage_1.default, {
                _id: new mongodb_1.ObjectId(id),
            });
            console.log(orphanage);
            return response.json(orphanages_view_1.default.render(orphanage));
        }
        catch (error) {
            console.error(error);
            return response.status(500).json({ error: error.message });
        }
    },
    async create(request, response) {
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = request.body;
        const orphanagesRepository = typeorm_1.getMongoManager();
        const requestImages = request.files;
        const images = requestImages.map(image => {
            return {
                path: image.filename
            };
        });
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().max(300).required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required(),
            })),
        });
        await schema.validate(data, { abortEarly: false });
        const orphanage = await orphanagesRepository.save(Orphanage_1.default, data);
        return response.status(201).json(orphanage);
    }
};

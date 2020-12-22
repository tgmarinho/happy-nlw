import { Request, Response } from 'express';
import {getMongoManager} from "typeorm";
import * as Yup from 'yup';
import { ObjectId } from 'mongodb';

import orphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';


export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getMongoManager();

    const orphanages = await orphanagesRepository.find(Orphanage, { is_pending: false });

    console.log(orphanages)

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    
    try {
      const orphanagesRepository = getMongoManager();

      const orphanage = await orphanagesRepository.findOne(Orphanage, {
       _id: new ObjectId(id),
      }) as Orphanage
  
     
  
      return response.json(orphanageView.render(orphanage));
    } catch (error) {
      console.error(error)
      return response.status(500).json({error: error.message});
    }
   
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      whatsapp
    } = request.body;

    const orphanagesRepository = getMongoManager();

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image: any) => {
      return {
        path: image.key
      }
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
      whatsapp,
      is_pending: true,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      whatsapp: Yup.string().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      })),
    });

    await schema.validate(data, { abortEarly: false });

    const orphanage = await orphanagesRepository.save(Orphanage, data);


    return response.status(201).json(orphanage);
  }
};

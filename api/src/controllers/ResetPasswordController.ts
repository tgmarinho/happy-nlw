import { Request, Response } from 'express';

import AppError from '@errors/AppError';
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import {getMongoManager} from "typeorm";

import { hash } from 'bcryptjs';

import User from '@models/User';


export default {

  async create(request: Request, response: Response) {

    const { password, token } = request.body;

    const usersRepository = getMongoManager();

    const user = await usersRepository.findOne<User>(User, {
      token
     }) 

    if (!user) {
      throw new AppError('User token does not exists');
    }

    const passwordHashed = await hash(password, 8);


    usersRepository.updateOne('User', { _id: user._id }, { $set: { password: passwordHashed }} )


    return response.status(204).json();

  }
}
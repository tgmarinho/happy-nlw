import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import {getMongoManager} from "typeorm";
import authConfig from '@config/auth';

import { compare } from 'bcryptjs';

import User from '../models/User';


export default {

  async create(request: Request, response: Response) {
    const {
      email,
      password
    } = request.body;

    const usersRepository = getMongoManager();

    const user = await usersRepository.findOne<User>(User, {
      email
     }) 

     if(!user) {
       return response.status(401).json({ message: "Incorrect email/password combination!"})
     }

    //  const p = await hash("12345678", 8)

     const passwordMatched = await compare(password, user.password);

     
     if (!passwordMatched) {
      return response.status(401).json({ message: "Incorrect email/password combination!"})
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user._id),
      expiresIn,
    });

    // delete user.password; // TODO: ts dando trabalhoo aqui

    return response.status(200).json({user, token});
  }
};

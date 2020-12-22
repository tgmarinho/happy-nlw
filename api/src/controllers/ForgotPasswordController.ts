import AppError from '@errors/AppError';
import { Request, Response } from 'express';
import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import {getMongoManager} from "typeorm";

import { hash } from 'bcryptjs';

import User from '@models/User';

import nodemailer from 'nodemailer';

export default  {
  
   async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
   
    const usersRepository = getMongoManager();

    const user = await usersRepository.findOne<User>(User, {
      email
     }) 


  
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await hash(user._id + String(Math.random()), 8);

  
    usersRepository.updateOne('User', { _id: user._id }, { $set: { token }} )


    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );


    const templateFileContent = await fs.promises.readFile(forgotPasswordTemplate, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);
    const variables = {name: user.name, link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`, }

   const template = parseTemplate(variables);


   var transport = nodemailer.createTransport({
    auth: {
      user: "109b42360028f1",
      pass: "907f3523d2a604"
    },
    port: 2525,
    host: "smtp.mailtrap.io",
    
  });
    
    transport.sendMail({
      from: 'Happy <oi@happy.com.br>',
      to: user.email,
      subject: 'Resetando a senha! <3',
      html: template
    })

    return response.status(204).json();
  }
}

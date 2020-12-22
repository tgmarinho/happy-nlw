import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/upload';

import OrphanagesController from '@controllers/OrphanagesController';
import SessionController from '@controllers/SessionController';
import ForgotPasswordController from '@controllers/ForgotPasswordController';
import ResetPasswordController from '@controllers/ResetPasswordController';

import { celebrate, Joi, Segments } from 'celebrate';


const routes = Router();
const upload = multer(multerConfig)

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);


routes.post(
  '/session',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionController.create,
);


routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: { email: Joi.string().required() },
  }),
  ForgotPasswordController.create,
);

routes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ResetPasswordController.create,
);


export default routes;

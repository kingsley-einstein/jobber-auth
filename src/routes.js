import { Router } from 'express';
import controllers from './controllers';
import middlewares from './middlewares';

const router = Router();
const { AuthController } = controllers;
const { Auth } = middlewares;

router.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
    body: 'Welcome to job boards API'
  });
});

router.post(
  '/auth/register',
  Auth.checkIfBodyHasKeys,
  Auth.checkIfUserExists,
  AuthController.create
);

router.post(
  '/auth/login',
  AuthController.logIn
);

router.patch(
  '/auth/update',
  Auth.verifyUser,
  AuthController.update
);

router.get(
  '/auth/getLoggedUser',
  Auth.verifyUser,
  AuthController.getLoggedUser
);

export default router;

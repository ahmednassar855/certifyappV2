import Express from 'express';
import * as authController from './authController.js';

const authRouter = Express.Router();

// authRouter.post('/login', authController.login);
// authRouter.post('/signup', authController.signup);
// authRouter.get('/verify/:token', authController.verify);
// authRouter.post(
//   '/forgetPassword',
//   authController.forgetPassword
// );
// authRouter.patch(
//   '/resetPassword/:token',
//   authController.resetPassword
// );
authRouter.get('/current-user' , authController.getCurrentUser)

export default authRouter;
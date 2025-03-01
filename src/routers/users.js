import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUsersController,
  loginUsersController,
  logoutUsersController,
  refreshUserController,
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUsersController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUsersController),
);
router.post('/logout', authenticate, ctrlWrapper(logoutUsersController));
router.get('/current', authenticate, ctrlWrapper(refreshUserController));
export default router;

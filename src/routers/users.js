import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { registerUserSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUsersController } from '../controllers/users.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUsersController),
);

export default router;

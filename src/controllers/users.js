import createHttpError from 'http-errors';
import { findUserByEmail, registerUser } from '../services/users.js';

export const registerUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    throw new createHttpError(409, 'Email in use');
  }

  const newUser = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User successsfuly registered user',
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

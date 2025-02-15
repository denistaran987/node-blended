import createHttpError from 'http-errors';
import { findUserByEmail, registerUser } from '../services/users.js';
import bcrypt from 'bcrypt';
import { createNewSession } from '../services/users.js';
import { setupCookies } from '../utils/setupCookies.js';

export const registerUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (user) {
    throw createHttpError(409, 'Email in use');
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
export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    throw createHttpError(401, 'Wrong credentials');
  }
  const passwordCorrect = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!passwordCorrect) {
    throw createHttpError(401, 'Wrong credentials');
  }
  const newSession = await createNewSession(user._id);
  setupCookies(newSession._id, newSession.refreshToken, res);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: newSession.accessToken },
  });
};

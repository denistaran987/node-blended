import createHttpError from 'http-errors';
import {
  clearToken,
  findUserByEmail,
  registerUser,
  updateUserWithToken,
} from '../services/users.js';
import bcrypt from 'bcrypt';
export const registerUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const newUser = await registerUser(req.body);
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};
export const loginUsersController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    throw createHttpError(401, 'Wrong credentials');
  }
  const isPswCorrect = bcrypt.compare(req.body.password, user.password);
  if (!isPswCorrect) throw createHttpError(401, 'Wrong credentials');
  const updatedUser = await updateUserWithToken(user._id);
  res.status(200).json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
    token: updatedUser.token,
  });
};
export const logoutUsersController = async (req, res) => {
  await clearToken(req.user._id);
  res.status(204).send();
};
export const refreshUserController = async (req, res) => {
  const { name, email } = req.user;
  res.status(200).json({
    name,
    email,
  });
};

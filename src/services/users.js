import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const updateUserWithToken = (userId) => {
  const token = jwt.sign({ id: userId }, env('SECRET_KEY'));

  return UsersCollection.findByIdAndUpdate(
    userId,
    {
      token,
    },
    {
      new: true,
    },
  );
};

export const registerUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  const user = await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });

  return await updateUserWithToken(user._id);
};
export const findUserById = (userId) => UsersCollection.findById(userId);
export const clearToken = (userId) =>
  UsersCollection.findByIdAndUpdate(userId, { token: '' });

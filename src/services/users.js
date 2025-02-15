import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const registerUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

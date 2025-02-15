import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';
export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const registerUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const createNewSession = async (userId) => {
  await SessionsCollection.findOneAndDelete({ userId });
  return SessionsCollection.create({ userId, ...createSession() });
};

export const findSessionByToken = (token) =>
  SessionsCollection.findOne({ accessToken: token });

export const findUserById = (userId) => UsersCollection.findById(userId);

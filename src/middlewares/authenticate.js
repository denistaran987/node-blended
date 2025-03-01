import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { findUserById } from '../services/users.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Autorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide authorization token'));
    return;
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Wrong token'));
  }
  const { userId } = jwt.verify(token, env('SECRET_KEY'));
  const user = await findUserById(userId);
  if (!user) {
    next(createHttpError(401, "User dosen't exist"));
  }
  req.user = user;
  next();
};

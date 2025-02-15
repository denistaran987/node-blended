import createHttpError from 'http-errors';
import { findSessionByToken, findUserById } from '../services/users.js';

export const checkToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Wrong token'));
    return;
  }
  const session = await findSessionByToken(token);
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }
  if (Date.now() > session.accessTokenValidUntil) {
    next(createHttpError(401, 'Token is expired'));
    return;
  }
  const user = await findUserById(session.userId);
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }
  req.user = user;
  next();
};

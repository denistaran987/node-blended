import { randomBytes } from 'crypto';
import { THIRTY_DAYS } from '../constants/index.js';
export const createSession = () => ({
  accessToken: randomBytes(35).toString('base64'),
  refreshToken: randomBytes(35).toString('base64'),
  accessTokenValidUntil: Date.now() + 1000 * 60 * 15,
  refreshTokenValidUntil: Date.now() + THIRTY_DAYS,
});

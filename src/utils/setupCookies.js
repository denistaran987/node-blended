import { THIRTY_DAYS } from '../constants/index.js';

export const setupCookies = (sessionId, refreshToken, res) => {
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

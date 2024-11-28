import { verifyToken } from '../utils/index.js';

export const authMiddleWare = (req, res, next) => {
  // const token = req.header('token');
  // get token from header authorization bearer token
  const token = req?.headers?.authorization?.split(' ')[1];
  if (!token) {
    return res.status(200).json({ msg: 'No token provided', success: false });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(200).json({ msg: 'Invalid token', success: false });
  }
};

export function authCookieMiddleware(req, res, next) {
  const result =
    req?.headers?.cookie
      ?.split(';')
      ?.find((cookie) => cookie?.includes('token')) || '';
  const token = result?.split('=')[1];

  if (!token) return res.status(401).send('Access Denied');
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

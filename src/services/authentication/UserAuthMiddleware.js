import axios from 'axios';

/**
 * Sending SYNC comunication to
 * authentication microservice
 */
export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send();
  }

  try {
    const response = await axios.get(process.env.CHECK_AUTH_TOKEN_URL, {
      headers: {
        Authorization: authorization
      }
    });

    req.authUserInfo = response.data;

    return next();
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      return res.status(401).send();
    }

    return next(err);
  }
};

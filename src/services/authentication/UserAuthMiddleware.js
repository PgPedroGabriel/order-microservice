import axios from 'axios';

/**
 * Sending SYNC comunication to
 * authentication microservice
 *
 * @todo
 * ON catch scope, send a alert
 * of out comunication with auth
 * microservices
 */
export default async (req, res, next) => {
  const { authorization } = req.headers;

  console.log(authorization);

  if (!authorization) {
    return res.status(401).send();
  }

  try {
    const response = await axios.get(process.env.CHECK_AUTH_TOKEN_URL);

    console.log(response);

    req.authUserInfo = response.data;

    return next();
  } catch (err) {
    return res.status(401).send();
  }
};

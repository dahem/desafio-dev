import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import dotenv from "dotenv";
dotenv.config();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWKS_URI
  }),
  audience: 'http://localhost:3000',
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256']
});

export default jwtCheck;
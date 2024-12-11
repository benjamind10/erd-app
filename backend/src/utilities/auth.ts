import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../models/user';

// Load environment variables
dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error(
    'Missing JWT_SECRET or JWT_EXPIRES_IN in environment variables'
  );
}

/**
 * Generates a JWT token for the given user.
 * @param user - The user object to encode in the token.
 * @returns The JWT token.
 */
export const generateToken = (user: IUser): string => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param token - The JWT token to verify.
 * @returns The decoded token payload.
 */
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Extracts and verifies the JWT token from the Authorization header.
 * @param authHeader - The Authorization header.
 * @returns The user payload.
 */
export const getUserFromAuthHeader = (authHeader: string): any => {
  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid Authorization header format');
  }
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
};

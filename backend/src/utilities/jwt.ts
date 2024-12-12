import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generates a JWT for the given user ID.
 *
 * @param userId - The ID of the user to include in the token.
 * @returns The generated JWT token.
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verifies and decodes a JWT.
 *
 * @param token - The JWT token to verify.
 * @returns The decoded payload if the token is valid.
 */
export const verifyToken = (token: string): { id: string } => {
  return jwt.verify(token, JWT_SECRET) as { id: string };
};

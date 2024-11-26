import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!

/**
 * Extracts and verifies a JWT from the authorization header to get the user data.
 * @param authHeader - The authorization header from the request, expected in the format 'Bearer <token>'.
 * @returns The decoded user object if the token is valid; otherwise, null.
 */
export const getUserFromAuthHeader = (authHeader: string): { id: string } | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('No authorization header or incorrect format');
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded;
  } catch (error) {
    console.error('Failed to authenticate token:', error);
    return null;
  }
};

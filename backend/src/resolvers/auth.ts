import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

/**
 * Generates a JWT token for the given user ID.
 *
 * @param userId - The ID of the user.
 * @returns A JWT token string.
 */
const generateToken = (userId: string): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in environment variables.');
  }
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const authResolvers = {
  Mutation: {
    /**
     * Handles user login.
     *
     * @param _parent - Unused parent parameter.
     * @param args - Object containing email and password.
     * @returns AuthPayload with token and user information.
     */
    login: async (
      _parent: undefined,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        console.log('Attempting login for email:', email);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          console.error('User not found for email:', email);
          throw new Error('Invalid email or password');
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          console.error('Invalid password for email:', email);
          throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = generateToken(user._id.toString());

        console.log('Login successful for user:', user.email);

        return {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        };
      } catch (error: any) {
        console.error('Error in login mutation:', error.message);
        throw new Error('Login failed: ' + error.message);
      }
    },

    /**
     * Handles user signup.
     *
     * @param _parent - Unused parent parameter.
     * @param args - Object containing name, email, and password.
     * @returns AuthPayload with token and user information.
     */
    signup: async (
      _parent: undefined,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      try {
        console.log('Attempting signup for email:', email);

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.error('User already exists for email:', email);
          throw new Error('User already exists');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser._id.toString());

        console.log('Signup successful for user:', newUser.email);

        return {
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
          },
        };
      } catch (error: any) {
        console.error('Error in signup mutation:', error.message);
        throw new Error('Signup failed: ' + error.message);
      }
    },
  },
};

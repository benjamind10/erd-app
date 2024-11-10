import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
const JWT_SECRET = process.env.JWT_SECRET!;

export const authResolvers = {
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        console.log('Attempting login for email:', email); // Logging attempt

        if (!JWT_SECRET) {
          console.error('JWT_SECRET is missing in environment variables.');
          throw new Error('Server configuration error.');
        }

        const user = await User.findOne({ email });
        if (!user) {
          console.error('User not found for email:', email);
          throw new Error('User not found');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          console.error('Invalid password for email:', email);
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: '1h',
        });
        console.log('Login successful for user:', user.email);

        return {
          token,
          user,
        };
      } catch (error: any) {
        console.error('Error in login mutation:', error.message || error);
        throw new Error('Login failed: ' + error.message);
      }
    },
  },
};

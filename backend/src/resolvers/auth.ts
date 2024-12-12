import { User } from '../models/user';
import { generateToken } from '../utilities/auth';
import { IResolvers } from '@graphql-tools/utils';

interface LoginArgs {
  email: string;
  password: string;
}

interface RegisterArgs {
  name: string;
  email: string;
  password: string;
  roles?: string[];
}

interface Context {
  user?: { id: string; roles: string[] }; // Include roles in the user context
}

export const authResolvers: IResolvers = {
  Query: {
    /**
     * Protected `me` query to get the authenticated user's details.
     * @param _ - The parent object (not used here).
     * @param __ - The arguments object (not used here).
     * @param context - The context object containing the authenticated user.
     * @returns The user's details.
     */
    me: async (_: unknown, __: unknown, context: Context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      return User.findById(context.user.id);
    },
  },
  Mutation: {
    /**
     * Mutation to register a new user.
     * @param _ - The parent object (not used here).
     * @param args - The input arguments for registration.
     * @returns An object containing the JWT token and user details.
     */
    register: async (_: unknown, args: RegisterArgs) => {
      const { name, email, password, roles = ['user'] } = args;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email is already in use');
      }

      const user = new User({ name, email, password, roles });
      await user.save();

      return {
        token: generateToken(user),
        user,
      };
    },

    /**
     * Mutation to log in an existing user.
     * @param _ - The parent object (not used here).
     * @param args - The input arguments for login.
     * @returns An object containing the JWT token and user details.
     */
    login: async (_: unknown, args: LoginArgs) => {
      const { email, password } = args;

      try {
        console.log(`Login attempt: email=${email}`);

        const user = await User.findOne({ email });
        if (!user) {
          console.log('User not found');
          throw new Error('Invalid email or password');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        const token = generateToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error in login resolver:', error);
        throw error;
      }
    },

    /**
     * Mutation to update user roles.
     * @param _ - The parent object (not used here).
     * @param args - The input arguments for updating user roles.
     * @param context - The context object containing the authenticated user.
     * @returns The updated user's details.
     */
    updateUserRoles: async (
      _: unknown,
      args: { userId: string; roles: string[] },
      context: Context
    ) => {
      // Optional: Check if the requesting user has admin privileges
      if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Unauthorized');
      }

      const { userId, roles } = args;

      // Update the user's roles
      const user = await User.findByIdAndUpdate(
        userId,
        { roles },
        { new: true } // Return the updated user
      );

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },
  },
};

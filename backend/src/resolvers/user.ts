import { User } from '../models/users';

export const userResolvers = {
  Query: {
    getUser: async (_parent: undefined, args: { id: string }) => {
      const user = await User.findById(args.id).select('-password');
      return user;
    },

    getUsers: async () => {
      const users = await User.find().select('-password');
      return users;
    },
  },

  Mutation: {
    createUser: async (_parent: undefined, args: { name: string; email: string; password: string }) => {
      const { name, email, password } = args;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = new User({ name, email, password });
      await newUser.save();

      // Return the created user (excluding password)
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
    },
  },
};

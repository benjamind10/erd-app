import { User } from '../models/user';
import { isValidEmail } from '../utilities/helpers';

export const userResolvers = {
  Query: {
    /**
     * Retrieves a user by their unique ID, excluding the password field.
     *
     * @param _parent - Unused parent parameter.
     * @param args - An object containing the `id` of the user to retrieve.
     * @returns The user object if found; otherwise, `null`.
     */
    getUser: async (_parent: undefined, args: { id: string }) => {
      const user = await User.findById(args.id).select('-password');
      return user;
    },

    /**
     * Retrieves a list of all users, excluding their password fields.
     *
     * @param _parent - Unused parent parameter.
     * @returns An array of user objects.
     */
    getUsers: async () => {
      const users = await User.find().select('-password');
      return users;
    },
  },

  Mutation: {
    /**
     * Creates a new user if the email format is valid and does not already exist.
     * Validates the email format, checks for duplicates, and saves the new user.
     *
     * @param _parent - Unused parent parameter.
     * @param args - An object containing the user's `name`, `email`, and `password`.
     * @throws Error if the email is invalid or already exists.
     * @returns The created user object, excluding the password field.
     */
    createUser: async (
      _parent: undefined,
      args: { name: string; email: string; password: string }
    ) => {
      const { name, email, password } = args;

      // Validate email format
      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

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

    /**
     * Updates the name and optionally the email of a user by their ID.
     * Validates the email format if provided, constructs an update object,
     * and applies the changes.
     *
     * @param _parent - Unused parent parameter.
     * @param args - An object containing the `id`, `name`, and optional `email` of the user.
     * @throws Error if the email format is invalid or if the user is not found.
     * @returns The updated user object, excluding the password field.
     */
    updateUserName: async (
      _parent: undefined,
      args: { id: string; name: string; email?: string }
    ) => {
      // Validate email format if provided
      if (args.email && !isValidEmail(args.email)) {
        throw new Error('Invalid email format');
      }

      const updateData: { name?: string; email?: string } = {
        name: args.name,
      };

      if (args.email) {
        updateData.email = args.email;
      }

      const updatedUser = await User.findByIdAndUpdate(args.id, updateData, {
        new: true,
      }).select('-password');

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    },

    /**
     * Deletes a user by their unique ID.
     *
     * @param _parent - Unused parent parameter.
     * @param args - An object containing the `id` of the user to delete.
     * @returns `true` if the user was successfully deleted; otherwise, `false`.
     */
    deleteUser: async (_parent: undefined, args: { id: string }) => {
      const result = await User.findByIdAndDelete(args.id);
      return result ? true : false;
    },
  },
};

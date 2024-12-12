import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * IUser interface extends Mongoose's Document, representing a User entity.
 *
 * @property name - The name of the user.
 * @property email - The email of the user, which is unique and stored in lowercase.
 * @property password - The hashed password of the user.
 * @property roles - An array of roles assigned to the user.
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema fields definition
const userFields = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] }, // Default role is 'user'
};

// Create a Mongoose schema for the User model
const UserSchema: Schema<IUser> = new Schema(userFields);

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to hash.
 * @returns A promise that resolves to the hashed password string.
 */
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

/**
 * Mongoose pre-save hook to hash the password if it has been modified.
 * This function runs automatically before saving a User document.
 */
UserSchema.pre<IUser>('save', async function () {
  const user = this as IUser;

  if (user.isModified('password')) {
    user.password = await hashPassword(user.password);
  }
});

/**
 * Method to compare a candidate password with the stored hashed password.
 * @param candidatePassword - The plain text password to verify.
 * @returns A promise that resolves to true if the password matches, otherwise false.
 */
UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

/**
 * Mongoose model for User, providing an interface to the User collection in the database.
 */
export const User = mongoose.model<IUser>('User', UserSchema);

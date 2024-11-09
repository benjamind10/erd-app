import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userFields = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
};

const UserSchema: Schema<IUser> = new Schema(userFields);

// Helper function to hash the password
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Pre-save hook using async/await
UserSchema.pre<IUser>('save', async function () {
  const user = this as IUser;

  if (user.isModified('password')) {
    user.password = await hashPassword(user.password);
  }
});

// Export the User model
export const User = mongoose.model<IUser>('User', UserSchema);


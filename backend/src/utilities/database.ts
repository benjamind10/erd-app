import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the provided URI.
 * @param uri - The MongoDB connection string.
 */
export const connectToMongoDB = async (uri: string): Promise<void> => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');
};

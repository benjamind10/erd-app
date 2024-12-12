import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  image?: Buffer; // Binary data for storing image
  createdAt: Date;
  updatedAt: Date;
}

// Blog schema definition
const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: Buffer }, // Binary data for storing image
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Ensure `_id` is exposed as `id`
BlogSchema.set('toJSON', {
  virtuals: true,
  transform: (_: any, ret: any) => {
    ret.id = ret._id; // Map `_id` to `id`
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

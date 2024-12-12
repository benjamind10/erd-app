import { IResolvers } from '@graphql-tools/utils';
import { Blog } from '../models/blog';
import * as fs from 'fs';

/**
 * Helper function to extract Base64 data from a Data URL.
 * If the input is a Data URL, it strips the prefix and returns only the Base64 data.
 * If the input is already pure Base64 data, it returns it as-is.
 *
 * @param dataUrl - The input string that may contain the Data URL prefix.
 * @returns The pure Base64 data without any prefixes.
 */
const extractBase64Data = (dataUrl: string): string => {
  const matches = dataUrl.match(/^data:image\/\w+;base64,(.+)$/);
  if (matches && matches[1]) {
    return matches[1];
  }
  return dataUrl; // Return as-is if it's already pure Base64 data
};

export const blogResolvers: IResolvers = {
  Query: {
    blogs: async () => {
      try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return blogs.map(blog => ({
          ...blog.toObject(),
          id: blog._id.toString(),
          createdAt: blog.createdAt.toISOString(),
          // Ensure that the image field contains only pure Base64 data
          image: blog.image ? blog.image.toString() : null,
        }));
      } catch (error) {
        console.error('Error fetching blogs:', error);
        throw new Error('Failed to fetch blogs');
      }
    },
  },
  Mutation: {
    createBlog: async (
      _: any,
      {
        title,
        content,
        image,
      }: { title: string; content: string; image?: string }
    ) => {
      try {
        let processedImage: string | undefined = undefined;

        if (image) {
          processedImage = extractBase64Data(image);
        }

        const blog = new Blog({ title, content, image: processedImage });

        const savedBlog = await blog.save();

        return {
          ...savedBlog.toObject(),
          id: savedBlog._id.toString(),
          createdAt: savedBlog.createdAt.toISOString(),
          image: savedBlog.image ? savedBlog.image.toString() : null,
        };
      } catch (error) {
        console.error('Error creating blog:', error);
        throw new Error('Failed to create blog');
      }
    },
    deleteBlog: async (_: any, { id }: { id: string }) => {
      try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
          throw new Error('Blog not found');
        }
        return {
          ...blog.toObject(),
          id: blog._id.toString(),
          createdAt: blog.createdAt.toISOString(),
          image: blog.image ? blog.image.toString() : null,
        };
      } catch (error) {
        console.error('Error deleting blog:', error);
        throw new Error('Failed to delete blog');
      }
    },
    updateBlog: async (
      _: any,
      {
        id,
        title,
        content,
        image,
      }: { id: string; title: string; content: string; image?: string }
    ) => {
      try {
        let processedImage: string | undefined = undefined;

        if (image) {
          processedImage = extractBase64Data(image);
        }

        const updateData: Partial<{
          title: string;
          content: string;
          image: string;
        }> = { title, content };

        if (image) {
          updateData.image = processedImage;
        }

        const blog = await Blog.findByIdAndUpdate(id, updateData, {
          new: true, // Return the updated blog
        });

        if (!blog) {
          throw new Error('Blog not found');
        }

        return {
          ...blog.toObject(),
          id: blog._id.toString(),
          createdAt: blog.createdAt.toISOString(),
          image: blog.image ? blog.image.toString() : null,
        };
      } catch (error) {
        console.error('Error updating blog:', error);
        throw new Error('Failed to update blog');
      }
    },
  },
};

import { IResolvers } from '@graphql-tools/utils';
import { Blog } from '../models/blog';

export const blogResolvers: IResolvers = {
  Query: {
    blogs: async () => {
      try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return blogs.map(blog => ({
          ...blog.toObject(),
          id: blog._id.toString(),
          createdAt: blog.createdAt.toISOString(),
        }));
      } catch (error) {
        throw new Error('Failed to fetch blogs');
      }
    },
  },
  Mutation: {
    createBlog: async (
      _: any,
      { title, content, image }: { title: string; content: string; image?: any }
    ) => {
      try {
        const blog = new Blog({ title, content, image });
        return {
          ...(await blog.save()).toObject(),
          id: blog._id.toString(),
          createdAt: blog.createdAt.toISOString(),
        };
      } catch (error) {
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
        };
      } catch (error) {
        throw new Error('Failed to delete blog');
      }
    },
  },
};

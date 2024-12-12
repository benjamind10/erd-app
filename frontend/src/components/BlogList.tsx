import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, CircularProgress, Typography } from '@mui/material';
import BlogCard from './BlogCard';
import { DELETE_BLOG, GET_BLOGS } from '../api/blog';

const BlogList: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_BLOGS);
  const [deleteBlog] = useMutation(DELETE_BLOG);

  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const isAdmin = userRoles.includes('admin');

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Error loading blogs: {error.message}
        </Typography>
      </Container>
    );
  }

  if (!data || data.blogs.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">No blogs available.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingX: 2, maxWidth: 'lg' }}>
      {data.blogs.map((blog: any) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          content={blog.content}
          image={blog.image}
          createdAt={blog.createdAt}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      ))}
    </Container>
  );
};

export default BlogList;

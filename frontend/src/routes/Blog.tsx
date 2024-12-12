import React from 'react';
import { Container, Typography } from '@mui/material';
import BlogList from '../components/BlogList';

const Blog: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 4 }} align="center">
        Family Blog
      </Typography>
      <BlogList />
    </Container>
  );
};

export default Blog;

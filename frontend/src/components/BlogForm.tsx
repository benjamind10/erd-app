import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Input } from '@mui/material';
import { CREATE_BLOG } from '../api/blog';

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [createBlog] = useMutation(CREATE_BLOG);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBlog({
        variables: {
          title,
          content,
          image,
        },
      });

      setTitle('');
      setContent('');
      setImage(null);

      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        multiline
        rows={4}
        required
      />
      <Input
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={e => {
          const target = e.target as HTMLInputElement; // Explicitly cast e.target to HTMLInputElement
          setImage(target.files?.[0] || null);
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Create Blog
      </Button>
    </Box>
  );
};

export default BlogForm;

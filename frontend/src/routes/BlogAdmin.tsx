import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import { GET_BLOGS, DELETE_BLOG, CREATE_BLOG, UPDATE_BLOG } from '../api/blog';
import BlogForm from '../components/BlogForm';
import BlogTable from '../components/BlogTable';

const BlogAdmin: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_BLOGS);
  const [deleteBlog] = useMutation(DELETE_BLOG);
  const [createBlog] = useMutation(CREATE_BLOG);
  const [updateBlog] = useMutation(UPDATE_BLOG);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    image: null as File | null,
  });

  const handleFormSubmit = async (formData: {
    title: string;
    content: string;
    image: File | null;
  }) => {
    const { title, content, image } = formData;

    try {
      const imageBase64 = image ? await convertToBase64(image) : null;

      if (editMode && editId) {
        await updateBlog({
          variables: { id: editId, title, content, image: imageBase64 },
        });
      } else {
        await createBlog({
          variables: { title, content, image: imageBase64 },
        });
      }

      setEditMode(false);
      setEditId(null);
      setFormValues({ title: '', content: '', image: null });
      refetch();
    } catch (err) {
      console.error('Failed to submit blog:', err);
    }
  };

  const handleEdit = (blog: any) => {
    setEditMode(true);
    setEditId(blog.id);
    setFormValues({
      title: blog.title,
      content: blog.content,
      image: null, // Existing image cannot be re-uploaded directly
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog({ variables: { id } });
      refetch();
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setEditId(null);
    setFormValues({ title: '', content: '', image: null });
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography>Error loading blogs: {error.message}</Typography>;

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Blog Admin - Manage Posts
      </Typography>
      <BlogForm
        editMode={editMode}
        formValues={formValues}
        onSubmit={handleFormSubmit}
        onReset={resetForm}
      />
      <BlogTable
        blogs={data.blogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default BlogAdmin;

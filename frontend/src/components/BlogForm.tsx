import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface BlogFormProps {
  editMode: boolean;
  formValues: {
    title: string;
    content: string;
    image: File | null;
  };
  onSubmit: (formData: {
    title: string;
    content: string;
    image: File | null;
  }) => void;
  onReset: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({
  editMode,
  formValues,
  onSubmit,
  onReset,
}) => {
  const [formData, setFormData] = useState(formValues);

  // Prefill the form with the current blog data when in edit mode
  useEffect(() => {
    setFormData(formValues);
  }, [formValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', content: '', image: null });
  };

  return (
    <Box
      component="form"
      sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <Button variant="contained" component="label">
        Upload Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      <Button type="submit" variant="contained" color="primary">
        {editMode ? 'Update Blog' : 'Create Blog'}
      </Button>
      {editMode && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setFormData({ title: '', content: '', image: null });
            onReset();
          }}
        >
          Cancel Edit
        </Button>
      )}
    </Box>
  );
};

export default BlogForm;

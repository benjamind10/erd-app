import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface BlogTableProps {
  blogs: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }>;
  onEdit: (blog: any) => void;
  onDelete: (id: string) => void;
}

const BlogTable: React.FC<BlogTableProps> = ({ blogs, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.content}</TableCell>
              <TableCell>
                {new Date(blog.createdAt).toLocaleDateString('en-US')}
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(blog)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(blog.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogTable;

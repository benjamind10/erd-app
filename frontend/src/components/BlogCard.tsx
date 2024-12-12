import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  image?: string;
  mimeType?: string; // Optional: If handling multiple MIME types
  createdAt: string;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  content,
  image,
  mimeType,
  createdAt,
  onDelete,
  isAdmin,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Dynamically set MIME type if provided, else default to 'image/jpeg'
  const imageUrl =
    image && mimeType
      ? `data:${mimeType};base64,${image}`
      : image
      ? `data:image/jpeg;base64,${image}`
      : '';

  const handleOpen = () => {
    if (image) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ margin: 2, maxWidth: '100%' }}>
        {image ? (
          <Box
            sx={{
              width: '100%',
              maxHeight: 300, // Maximum height for the image container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden', // Hide any overflowing parts of the image
              cursor: 'pointer',
              backgroundColor: '#f0f0f0', // Light background to contrast the image
            }}
            onClick={handleOpen}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleOpen();
              }
            }}
            tabIndex={0} // Make the Box focusable for accessibility
            aria-label={`View full image for blog titled "${title}"`}
          >
            <img
              src={imageUrl}
              alt={`Blog titled "${title}"`} // Updated alt text without redundant words
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain', // Ensure the entire image is visible without stretching
                transition: 'transform 0.3s',
              }}
              onError={e => {
                (e.target as HTMLImageElement).src =
                  '/path/to/fallback-image.jpg'; // Replace with your fallback image path
              }}
            />
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              height: 300, // Match the maxHeight of the image container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray',
              color: 'white',
            }}
          >
            No Image Available
          </Typography>
        )}
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            {new Date(createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
          {isAdmin && onDelete && (
            <IconButton
              aria-label="delete"
              onClick={() => onDelete(id)}
              sx={{ float: 'right' }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen Dialog for Image */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="lg"
        fullWidth
        aria-labelledby="image-dialog-title"
      >
        <DialogTitle
          id="image-dialog-title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Image Preview</Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: '#000', // Dark background for better image visibility
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
        >
          <img
            src={imageUrl}
            alt={`Full Screen Image for blog titled "${title}"`}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '90vh',
              objectFit: 'contain', // Ensures the entire image is visible
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogCard;

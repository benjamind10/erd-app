import React, { useState } from 'react';
import { Typography, Container, Snackbar, Alert } from '@mui/material';

import FeedForm from '../components/FeedForm';
import { createFeeding } from '../api/feeding';

const Feeding: React.FC = () => {
  // State to control Snackbar visibility and message
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle closing the Snackbar
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrorMessage(null);
  };

  // Handle form submission
  const handleSubmit = async (
    feedingTime: string,
    amount: number,
    dha: boolean
  ) => {
    try {
      await createFeeding(feedingTime, amount, dha);
      console.log('Feeding entry created successfully');
      setOpen(true); // Open Snackbar on success
    } catch (error) {
      console.error('Error creating feeding entry:', error);
      setErrorMessage('Failed to add feeding entry. Please try again.');
      setOpen(true); // Open Snackbar on error
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', paddingY: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Feeding Tracker
      </Typography>
      <FeedForm onSubmit={handleSubmit} />

      {/* Snackbar for Success Message */}
      <Snackbar
        open={open}
        autoHideDuration={5000} // 5 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position at bottom-right
      >
        {errorMessage ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Feeding record added successfully!
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default Feeding;

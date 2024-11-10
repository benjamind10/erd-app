import React from 'react';
import { Typography, Container } from '@mui/material';

import FeedForm from '../components/FeedForm';
import { createFeeding } from '../api/feeding';

const handleSubmit = async (
  feedingTime: string,
  amount: number,
  dha: boolean
) => {
  try {
    await createFeeding(feedingTime, amount, dha);
    console.log('Feeding entry created successfully');
  } catch (error) {
    console.error('Error creating feeding entry:', error);
  }
};

const Feeding: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Feeding Tracker
      </Typography>
      <FeedForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default Feeding;

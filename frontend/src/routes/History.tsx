import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { fetchFeedings } from '../api/feeding';
import FeedingTable from '../components/FeedingTable';

interface Feeding {
  id: string;
  feedingTime: string;
  amount: number;
  dha: boolean;
  addedBy: string;
}

const History: React.FC = () => {
  const [feedings, setFeedings] = useState<Feeding[]>([]);

  useEffect(() => {
    const getFeedings = async () => {
      try {
        const data = await fetchFeedings();
        setFeedings(data);
      } catch (error) {
        console.error('Failed to fetch feedings:', error);
      }
    };

    getFeedings();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Feeding History
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <FeedingTable feedings={feedings} />
      </Box>
    </Container>
  );
};

export default History;

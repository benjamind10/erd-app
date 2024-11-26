// src/routes/TodayFeedings.tsx
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { fetchTodaysFeedings, updateFeeding } from '../api/feeding';
import FeedingCard from '../components/FeedingCard';
import TodayMetrics from '../components/TodayMetrics';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Feeding {
  id: string;
  feedingTime: string;
  amount: number;
  dha: boolean;
}

const TodayFeedings: React.FC = () => {
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedings = async () => {
      try {
        const data = await fetchTodaysFeedings();
        setFeedings(data);
      } catch (error) {
        console.error('Failed to fetch feedings:', error);
      } finally {
        setLoading(false);
      }
    };

    getFeedings();
  }, []);

  const handleUpdateFeeding = async (id: string, feedingTime: string, amount: number, dha: boolean) => {
    try {
      const updatedFeeding = await updateFeeding(id, feedingTime, amount, dha);
      setFeedings((prevFeedings) =>
        prevFeedings.map((feeding) => (feeding.id === id ? { ...feeding, ...updatedFeeding } : feeding))
      );
    } catch (error) {
      console.error('Failed to update feeding:', error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (feedings.length === 0) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Today's Feedings
        </Typography>
        <Typography variant="h6" align="center">
          No feedings recorded today.
        </Typography>
      </Container>
    );
  }

  const userTimeZone = dayjs.tz.guess();
  const totalAmountFed = feedings.reduce((sum, feeding) => sum + feeding.amount, 0);
  const dhaActive = feedings.some((feeding) => feeding.dha);
  const lastFeedingTime = dayjs.utc(Number(feedings[feedings.length - 1].feedingTime)).tz(userTimeZone);
  const timeSinceLastFeed = dayjs().diff(lastFeedingTime, 'hour', true);

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Today's Feedings
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {feedings.map((feeding) => (
          <Box key={feeding.id} sx={{ flex: '1 1 300px', maxWidth: '300px', marginBottom: 2 }}>
            <FeedingCard
              id={feeding.id}
              feedingTime={feeding.feedingTime}
              amount={feeding.amount}
              dha={feeding.dha}
              timezone={userTimeZone}
              onUpdate={handleUpdateFeeding}
            />
          </Box>
        ))}
      </Box>
      <TodayMetrics
        totalAmountFed={totalAmountFed}
        dhaActive={dhaActive}
        timeSinceLastFeed={timeSinceLastFeed}
      />
    </Container>
  );
};

export default TodayFeedings;

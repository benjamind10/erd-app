import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { fetchTodaysFeedings } from '../api/feeding';

// Extend dayjs with UTC and Timezone plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Define the Feeding interface
interface Feeding {
  id: string;
  feedingTime: string; // Assuming this is a timestamp string
  amount: number;
  dha: boolean;
}

const TodayFeedings: React.FC = () => {
  // State to hold today's feedings
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  // State to manage loading status
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

  if (loading) {
    // Display a loading spinner while fetching data
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
    // Inform the user if there are no feedings for today
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

  // Determine the user's timezone
  const userTimeZone = dayjs.tz.guess();

  // Calculate the total amount fed
  const totalAmountFed = feedings.reduce((sum, feeding) => sum + feeding.amount, 0);

  // Determine if DHA was active today (i.e., included in any feeding)
  const dhaActive = feedings.some((feeding) => feeding.dha);

  // Calculate time since the last feed
  const lastFeedingTime = dayjs.utc(Number(feedings[feedings.length - 1].feedingTime)).tz(userTimeZone);
  const timeSinceLastFeed = dayjs().diff(lastFeedingTime, 'hour', true); // true gives fractional hours
  const isOverThreshold = timeSinceLastFeed > 3.5;

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
          <Box
            key={feeding.id}
            sx={{
              flex: '1 1 300px',
              maxWidth: '300px',
              marginBottom: 2,
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Feeding Time:{' '}
                  {dayjs
                    .utc(Number(feeding.feedingTime))
                    .tz(userTimeZone)
                    .format('hh:mm A')}
                </Typography>
                <Typography>Amount: {feeding.amount} oz</Typography>
                <Typography>
                  DHA Included: {feeding.dha ? 'Yes' : 'No'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* 
        Added Section:
        Displays total amount fed, DHA status, and time since last feeding.
      */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 1 }}
        >
          Total Amount Fed: {totalAmountFed} oz
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: dhaActive ? 'green' : 'red',
          }}
        >
          DHA: {dhaActive ? 'Yes' : 'No'}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: isOverThreshold ? 'red' : 'inherit',
            mt: 2,
          }}
        >
          Time Since Last Feed: {timeSinceLastFeed.toFixed(1)} hours
        </Typography>
      </Box>
    </Container>
  );
};

export default TodayFeedings;

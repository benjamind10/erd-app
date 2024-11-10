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

  if (loading) {
    return <CircularProgress />;
  }

  if (feedings.length === 0) {
    return <Typography variant="h6">No feedings recorded today.</Typography>;
  }

  const userTimeZone = dayjs.tz.guess();

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
        {feedings.map(feeding => (
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
                <Typography variant="h6">
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
    </Container>
  );
};

export default TodayFeedings;

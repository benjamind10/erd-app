import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { fetchFeedings } from '../api/feeding';

dayjs.extend(utc);
dayjs.extend(timezone);

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Feeding Time</TableCell>
                <TableCell align="center">Amount (oz)</TableCell>
                <TableCell align="center">DHA Included</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedings.map((feeding) => (
                <TableRow key={feeding.id}>
                  <TableCell align="center">
                    {dayjs(parseInt(feeding.feedingTime))
                      .utc()
                      .local()
                      .format('YYYY-MM-DD hh:mm A')}
                  </TableCell>
                  <TableCell align="center">{feeding.amount}</TableCell>
                  <TableCell align="center">{feeding.dha ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default History;

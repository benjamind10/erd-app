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
  addedBy: string; // Ensure this field is available
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
                <TableCell>Feeding Time</TableCell>
                <TableCell>Amount (oz)</TableCell>
                <TableCell>DHA Included</TableCell>
                <TableCell>Added By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedings.map((feeding) => (
                <TableRow key={feeding.id}>
                  <TableCell>
                    {dayjs
                      .unix(parseInt(feeding.feedingTime))
                      .utc()
                      .local()
                      .format('YYYY-MM-DD hh:mm A')}
                  </TableCell>
                  <TableCell>{feeding.amount}</TableCell>
                  <TableCell>{feeding.dha ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{feeding.addedBy}</TableCell>
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

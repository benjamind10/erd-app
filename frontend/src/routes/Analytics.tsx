import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchFeedings } from '../api/feeding';
import { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import dayjs from 'dayjs';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

interface Feeding {
  feedingTime: string;
  amount: number;
}

const Analytics: React.FC = () => {
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeedings = async () => {
      try {
        const data = await fetchFeedings();
        setFeedings(data);
      } catch (error) {
        console.error('Failed to fetch feedings:', error);
        setError('Failed to fetch feedings.');
      } finally {
        setLoading(false);
      }
    };

    getFeedings();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Feeding Analytics
          </Typography>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Feeding Analytics
          </Typography>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  const chartData = {
    datasets: [
      {
        label: 'Feeding Amount (oz)',
        data: feedings.map(feeding => ({
          x: new Date(Number(feeding.feedingTime)),
          y: feeding.amount,
        })),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Use string literals like "top", "bottom", etc.
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Amount: ${context.parsed.y} oz`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'MMM d, h a',
          },
          tooltipFormat: 'MMM d, h:mm a',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
        title: {
          display: true,
          text: 'Date and Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (oz)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Feeding Analytics
        </Typography>
        {feedings.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <Typography>No data available for chart</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Analytics;

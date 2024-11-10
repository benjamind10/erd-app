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

// Register the necessary components
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
  feedingTime: string; // Ensure this is a valid timestamp or date string
  amount: number;
}

const Analytics: React.FC = () => {
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

  // Prepare data for the chart
  const chartData = {
    datasets: [
      {
        label: 'Feeding Amount (oz)',
        data: feedings.map(feeding => ({
          x: new Date(parseInt(feeding.feedingTime)), // Adjust parsing as needed
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
        position: 'top',
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
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
          },
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

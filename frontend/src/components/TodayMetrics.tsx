import React from 'react';
import { Box, Typography } from '@mui/material';

interface TodayMetricsProps {
    totalAmountFed: number;
    dhaActive: boolean;
    timeSinceLastFeed: number;
}

const TodayMetrics: React.FC<TodayMetricsProps> = ({
    totalAmountFed,
    dhaActive,
    timeSinceLastFeed,
}) => {
    const isOverThreshold = timeSinceLastFeed > 3.5;

    return (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                Total Amount Fed: {totalAmountFed} oz
            </Typography>
            <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', color: dhaActive ? 'green' : 'red' }}
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
    );
};

export default TodayMetrics;

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface FeedingCardProps {
    feedingTime: string;
    amount: number;
    dha: boolean;
    timezone: string;
}

const FeedingCard: React.FC<FeedingCardProps> = ({
    feedingTime,
    amount,
    dha,
    timezone,
}) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Feeding Time: {dayjs.utc(Number(feedingTime)).tz(timezone).format('hh:mm A')}
                </Typography>
                <Typography>Amount: {amount} oz</Typography>
                <Typography>DHA Included: {dha ? 'Yes' : 'No'}</Typography>
            </CardContent>
        </Card>
    );
};

export default FeedingCard;

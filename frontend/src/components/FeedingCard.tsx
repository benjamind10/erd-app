// src/components/FeedingCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';
import FeedingEditForm from './FeedingEditForm';

interface FeedingCardProps {
  id: string;
  feedingTime: string;
  amount: number;
  dha: boolean;
  timezone: string;
  onUpdate: (
    id: string,
    feedingTime: string,
    amount: number,
    dha: boolean
  ) => void;
}

const FeedingCard: React.FC<FeedingCardProps> = ({
  id,
  feedingTime,
  amount,
  dha,
  timezone,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubmit = (
    id: string,
    feedingTime: string,
    amount: number,
    dha: boolean
  ) => {
    onUpdate(id, feedingTime, amount, dha);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <FeedingEditForm
        feedingId={id}
        initialFeedingTime={feedingTime}
        initialAmount={amount}
        initialDha={dha}
        onSubmit={handleEditSubmit}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Feeding Time:{' '}
          {dayjs.utc(Number(feedingTime)).tz(timezone).format('hh:mm A')}
        </Typography>
        <Typography>Amount: {amount} oz</Typography>
        <Typography>DHA Included: {dha ? 'Yes' : 'No'}</Typography>
        <Button
          variant="outlined"
          onClick={() => setIsEditing(true)}
          sx={{ mt: 1 }}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeedingCard;

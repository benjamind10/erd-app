import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface FeedingEditFormProps {
  feedingId: string;
  initialFeedingTime: string; // ISO string or timestamp
  initialAmount: number;
  initialDha: boolean;
  onSubmit: (
    id: string,
    feedingTime: string,
    amount: number,
    dha: boolean
  ) => void;
  onCancel: () => void;
}

const FeedingEditForm: React.FC<FeedingEditFormProps> = ({
  feedingId,
  initialFeedingTime,
  initialAmount,
  initialDha,
  onSubmit,
  onCancel,
}) => {
  const isTimestamp = !isNaN(Number(initialFeedingTime)); // Check if it's a timestamp
  const [feedingTime, setFeedingTime] = useState<Dayjs | null>(
    isTimestamp
      ? dayjs(Number(initialFeedingTime)) // Parse as timestamp
      : dayjs(initialFeedingTime) // Parse as ISO string
  );
  const [amount, setAmount] = useState<number | string>(initialAmount);
  const [dha, setDha] = useState(initialDha);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedAmount =
      typeof amount === 'string' && amount === '' ? 0 : Number(amount);
    if (feedingTime && parsedAmount > 0) {
      onSubmit(feedingId, feedingTime.toISOString(), parsedAmount, dha);
    } else {
      alert("Amount can't be 0 or empty.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h6">Edit Feeding</Typography>

      <DateTimePicker
        label="Feeding Time"
        value={feedingTime}
        onChange={newValue => setFeedingTime(newValue)}
        slotProps={{
          textField: { fullWidth: true, margin: 'normal' },
        }}
      />

      <TextField
        label="Amount (oz)"
        type="number"
        value={amount}
        onFocus={() => amount === 0 && setAmount('')} // Clears the field if the current value is 0
        onBlur={() => setAmount(prev => (prev === '' ? 0 : prev))} // Resets to 0 if left empty
        onChange={e => setAmount(Math.max(0, Number(e.target.value)) || '')} // Allow empty string temporarily
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Switch checked={dha} onChange={e => setDha(e.target.checked)} />
        }
        label="DHA Included"
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default FeedingEditForm;

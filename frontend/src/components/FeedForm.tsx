import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface FeedFormProps {
  onSubmit: (feedingTime: string, amount: number, dha: boolean) => void;
}

const FeedForm: React.FC<FeedFormProps> = ({ onSubmit }) => {
  const [feedingTime, setFeedingTime] = useState<Dayjs | null>(dayjs());
  const [amount, setAmount] = useState<number>(0);
  const [dha, setDha] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (feedingTime && amount > 0) {
      onSubmit(feedingTime.toISOString(), amount, dha);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {/* DateTime Picker for feeding time */}
      <DateTimePicker
        label="Feeding Time"
        value={feedingTime}
        onChange={(newValue) => setFeedingTime(newValue)}
        slotProps={{
          textField: { fullWidth: true, margin: 'normal' },
        }}
      />
      {/* Input for amount */}
      <TextField
        label="Amount (oz)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} // Prevents negative values
        fullWidth
        margin="normal"
      />
      {/* Checkbox for DHA */}
      <FormControlLabel
        control={<Checkbox checked={dha} onChange={(e) => setDha(e.target.checked)} />}
        label="DHA Included"
      />
      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </Box>
  );
};

export default FeedForm;

import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface FeedFormProps {
  onSubmit: (feedingTime: string, amount: number, dha: boolean) => void;
}

const FeedForm: React.FC<FeedFormProps> = ({ onSubmit }) => {
  const [feedingTime, setFeedingTime] = useState<Dayjs | null>(dayjs());
  const [amount, setAmount] = useState<number | string>(0);
  const [dha, setDha] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedAmount =
      typeof amount === 'string' && amount === '' ? 0 : Number(amount);
    if (feedingTime && parsedAmount > 0) {
      onSubmit(feedingTime.toISOString(), parsedAmount, dha);
      handleClear();
    } else {
      alert("Amount can't be 0 or empty.");
    }
  };


  const handleClear = () => {
    setFeedingTime(dayjs());
    setAmount(0);
    setDha(false);
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
          <Checkbox checked={dha} onChange={e => setDha(e.target.checked)} />
        }
        label="DHA Included"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default FeedForm;

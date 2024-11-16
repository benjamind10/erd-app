// src/routes/LoginPage.tsx

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="40vh"
      flexDirection="column"
    >
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      {error && (
        <Typography color="error" variant="body2" mb={2}>
          {error}
        </Typography>
      )}
      <LoginForm onError={setError} />
    </Box>
  );
};

export default LoginPage;

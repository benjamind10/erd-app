// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login as loginApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginApi(email, password);
            authLogin();
            navigate('/');
        } catch (error) {
            setError('Invalid credentials');
            console.error(error);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="40vh"
            flexDirection="column"
        >
            <Typography variant="h4" mb={2}>Login</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 360 }}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;

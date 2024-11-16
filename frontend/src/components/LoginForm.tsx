import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { login as loginApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
    onError: (error: string | null) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginApi(email, password);
            authLogin();
            navigate('/');
        } catch (error) {
            onError('Invalid credentials');
            console.error(error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: '100%', maxWidth: 360 }}
        >
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;

import React from 'react';
import { Typography, Container } from '@mui/material';

const Unauthorized: React.FC = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', paddingY: 4 }}>
            <Typography variant="h4" gutterBottom>
                Unauthorized
            </Typography>
            <Typography variant="body1">
                You do not have permission to access this page.
            </Typography>
        </Container>
    );
};

export default Unauthorized;

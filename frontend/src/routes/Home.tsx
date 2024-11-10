import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Feeding Tracker App
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Our app helps you keep track of feeding times, amounts, and DHA
          inclusion for accurate records and better health monitoring.
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 600, margin: 'auto' }}>
        <CardMedia
          component="img"
          alt="Feeding Tracker"
          height="300"
          image="https://via.placeholder.com/600x300" // Replace with an actual image URL
          title="Feeding Tracker"
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            Easily log each feeding, review your records, and analyze trends to
            ensure optimal care. With user-friendly tools and reliable tracking,
            our app makes monitoring feedings simple and accessible.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;

import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

interface WelcomeCardProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  title = 'Welcome to my Personal Website',
  subtitle = 'This is a modern website built with React and Material-UI',
  buttonText = 'Get Started',
  onButtonClick,
}) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      // console.log('Get Started clicked!');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }} data-testid="welcome-card">
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        data-testid="welcome-title"
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        component="p"
        color="text.secondary"
        paragraph
        data-testid="welcome-subtitle"
      >
        {subtitle}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleButtonClick}
          data-testid="welcome-button"
        >
          {buttonText}
        </Button>
      </Box>
    </Paper>
  );
};

export default WelcomeCard;

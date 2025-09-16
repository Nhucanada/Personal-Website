import React from 'react';
import { Container, Box } from '@mui/material';
import WelcomeCard from '../components/WelcomeCard';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <WelcomeCard
          title="Nathan Hu"
          subtitle="CS & AI Student at McGill University | Software Engineering Intern"
          buttonText="View My Work"
        />
      </Box>
    </Container>
  );
};

export default HomePage;
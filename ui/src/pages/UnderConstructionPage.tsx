import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

const UnderConstructionPage: React.FC = () => (
  <Container maxWidth="md">
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: { xs: 3, sm: 5 },
          textAlign: 'center',
          border: '1px solid #d8d4cc',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Site Under Construction
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          We&apos;re actively updating this website.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please check back soon for the latest version.
        </Typography>
      </Paper>
    </Box>
  </Container>
);

export default UnderConstructionPage;

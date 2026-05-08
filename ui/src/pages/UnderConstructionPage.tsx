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
          Oopsies! I&apos;m not done yet!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          I&apos;m either not finished something on this site, or in the process of
          editing/fixing something.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please check back soon, I don&apos;t wanna lose ya!
        </Typography>
      </Paper>
    </Box>
  </Container>
);

export default UnderConstructionPage;

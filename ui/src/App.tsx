import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Button
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <HomeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Website
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to my Personal Website
            </Typography>
            <Typography variant="h5" component="p" color="text.secondary" paragraph>
              This is a modern website built with React and Material-UI
            </Typography>
            <Button variant="contained" size="large" sx={{ mt: 2 }}>
              Get Started
            </Button>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
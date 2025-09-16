import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  ContactMail as ContactIcon,
  Psychology as AIIcon
} from '@mui/icons-material';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactElement;
}

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Personal Website'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems: NavigationItem[] = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'About', path: '/about', icon: <PersonIcon /> },
    { label: 'Projects', path: '/projects', icon: <CodeIcon /> },
    { label: 'Experience', path: '/experience', icon: <WorkIcon /> },
    { label: 'Education', path: '/education', icon: <SchoolIcon /> },
    { label: 'AI Development', path: '/ai', icon: <AIIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactIcon /> }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const DesktopNavigation = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => handleNavigation(item.path)}
          startIcon={item.icon}
          sx={{
            textTransform: 'none',
            fontWeight: isActivePath(item.path) ? 'bold' : 'normal',
            bgcolor: isActivePath(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
          data-testid={`nav-${item.label.toLowerCase()}`}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const MobileNavigation = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      data-testid="mobile-menu"
    >
      <Box sx={{ width: 250 }} role="navigation">
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActivePath(item.path)}
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="static" data-testid="header">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => handleNavigation('/')}
            sx={{ mr: 2 }}
            data-testid="home-icon-button"
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => handleNavigation('/')}
            data-testid="header-title"
          >
            {title}
          </Typography>

          {isMobile ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              data-testid="menu-button"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <DesktopNavigation />
          )}
        </Toolbar>
      </AppBar>
      {isMobile && <MobileNavigation />}
    </>
  );
};

export default Header;
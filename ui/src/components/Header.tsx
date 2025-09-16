import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
  title?: string;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Personal Website',
  showMenuButton = false,
  onMenuClick
}) => {
  return (
    <AppBar position="static" data-testid="header">
      <Toolbar>
        <HomeIcon sx={{ mr: 2 }} data-testid="home-icon" />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          data-testid="header-title"
        >
          {title}
        </Typography>
        {showMenuButton && (
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            data-testid="menu-button"
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
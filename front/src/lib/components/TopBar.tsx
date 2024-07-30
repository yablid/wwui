// components/TopBar/ButtonAppBar.tsx

import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@lib/context/AuthContext.tsx';
import { useMenu } from '@lib/context/MenuContext.tsx';

// mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function TopBar() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { pages } = useMenu();
  const { userData, handleLogout } = useAuth();
  console.log("TopBar userData", userData)
  const username = userData?.username || 'Anon';

  const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorElNav(event.currentTarget);
  }

 const handleCloseNavMenu = (path: string | null) => {
    setAnchorElNav(null);
    if (path) {
      console.log("Navigating to: ", path)
      navigate(path);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton
            sx={{ mr: 2 }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={() => handleCloseNavMenu(null)}
            sx = {{
              display: { xs: "block", md: "block" }
            }}
          >
            {pages?.map((page) => (
                <MenuItem
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" color="primary.main" sx={{ flexGrow: 1 }}>
            {username}
          </Typography>
          <Button
              color = "primary"
              size = "large"
              variant = "outlined"
              onClick = {  async () => {
                  if (userData) {
                    handleLogout();
                    navigate("/login");
                  } else {
                    navigate("/login");
                  }
              }}
          >{userData ? 'Logout' : 'login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

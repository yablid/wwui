// src/lib/components/BottomBar.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

// import chickenGun from '../assets/images/chickenGun.webp';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: '75%', margin: '0 auto' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={( event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RecentActorsIcon />} />
        <BottomNavigationAction label="Favorites" icon={<RecentActorsIcon />} />
        <BottomNavigationAction label="Nearby" icon={<RecentActorsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
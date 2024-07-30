// src/pages/addWallet.tsx
import React from 'react';
import WalletFormComponent from '@lib/components/WalletForm.tsx';
import SimpleBottomNavigation from '@lib/components/BottomBar.tsx';
import { Box, Grid } from '@mui/material';

const AddWalletPage: React.FC = () => {

  return (
    <Box minHeight="100vh" bgcolor='background.default'>

      <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          marginLeft={8}
      >

        {/* Wallet Entry Form */}
        <Grid item sx={{ height: '25vh', mt: 10}}>
          <Box>
            <WalletFormComponent />
          </Box>
        </Grid>

        {/* Spacing div */}
        <Box>
        <Grid item sx={{ height: '25vh'}} />
        </Box>

        {/* Bottom Bar */}
        <Grid item sx={{ height: '25vh'}}>
          <Box border={1} p={2} borderColor="red">
          <SimpleBottomNavigation />
          </Box>
        </Grid>

      </Grid>

    </Box>
  );
};

export default AddWalletPage;

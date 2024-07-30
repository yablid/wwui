// src/pages/login.tsx
import React from 'react';
import LoginFormComponent from '@lib/components/LoginForm.tsx';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const LoginPage: React.FC = () => {

  console.log("Rendering Login Page...")

  return (
      <Container component="main">
        <Box
            minHeight="100vh"
            width= "100%"
            bgcolor='background.default'
            display = "flex"
            justifyContent = "center"
            alignItems = "center"
        >
            <LoginFormComponent />
        </Box>
      </Container>
  );
};

export default LoginPage;

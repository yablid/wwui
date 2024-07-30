// src/pages/register.tsx
import RegisterFormComponent from '../lib/components/RegisterForm.tsx';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Register: React.FC = () => {
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
            <RegisterFormComponent />
        </Box>
      </Container>
  );
};

export default Register;

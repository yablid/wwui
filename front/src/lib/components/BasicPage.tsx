// src/lib/components/BasicPage.tsx
import React from "react";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
    title: string;
    icon: React.ReactNode;
}

export const BasicPage = ({ title, icon }: Props) => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>{icon}</Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Box>
    </Container>
  );
};
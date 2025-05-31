import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "./logo.png";

const Navbar = () => {
  return (
    <Box sx={{ bgcolor: "primary.main" }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src={logo} width={80} height={80} alt="logo" />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;

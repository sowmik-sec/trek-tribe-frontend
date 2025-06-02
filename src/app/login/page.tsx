"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import logo from "./logo.png";
import TTForm from "@/components/form/TTForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TTInput from "@/components/form/TTInput";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(4, "Must be at least 4 characters"),
});

const Login = () => {
  const [error, setError] = useState("");
  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessTokeLn) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        // router.push("/dashboard");
      } else {
        setError(res.message);
        // console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box>
              <Image src={logo} alt="logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login Trek Tribe
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <TTForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{ email: "", password: "" }}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 6 }}>
                  <TTInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TTInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Link href={"/forgot-password"}>
                <Typography
                  mb={1}
                  textAlign="end"
                  component="p"
                  fontWeight={300}
                  sx={{ textDecoration: "underline" }}
                >
                  Forgot Password
                </Typography>
              </Link>
              <Button
                sx={{
                  margin: "10px 0px",
                  background: "linear-gradient(45deg, #3B82F6, #8B5CF6)", // Blue-to-purple gradient
                  color: "#FFFFFF",
                  fontWeight: 600,
                  padding: "10px 16px",
                  borderRadius: "5px",
                  textTransform: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    background: "linear-gradient(45deg, #2563EB, #7C3AED)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                  "&:focus": {
                    outline: "2px solid #FFFFFF",
                    outlineOffset: "2px",
                  },
                  "&:disabled": {
                    background: "#B0BEC5", // Gray when disabled
                    color: "#E0E0E0",
                    cursor: "not-allowed",
                  },
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography>
                Don&apos;t have an account?{" "}
                <Link href={"/register"}>Create an account</Link>
              </Typography>
            </TTForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;

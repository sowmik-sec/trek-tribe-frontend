"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "./logo.png";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TTForm from "@/components/form/TTForm";
import TTInput from "@/components/form/TTInput";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerUser } from "@/services/actions/registerUser";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  profile: z.object({
    age: z.coerce.number().optional(),
    bio: z.string().optional(),
  }),
});

export const defaultValues = {
  name: "",
  email: "",
  password: "",
  profile: {
    age: 0,
    bio: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    console.log(data);
    try {
      const res = await registerUser(data);
      console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Register in Trek Tribe
              </Typography>
            </Box>
          </Stack>

          <Box>
            <TTForm
              onSubmit={handleRegister}
              resolver={zodResolver(userValidationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 12 }}>
                  <TTInput label="Name" fullWidth={true} name="name" />
                </Grid>
                <Grid size={{ md: 12 }}>
                  <TTInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid size={{ md: 12 }}>
                  <TTInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid size={{ md: 12 }}>
                  <TTInput
                    label="Age"
                    type="number"
                    fullWidth={true}
                    name="profile.age"
                  />
                </Grid>
                <Grid size={{ md: 12 }}>
                  <TTInput label="Bio" fullWidth={true} name="profile.bio" />
                </Grid>
              </Grid>
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
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </TTForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;

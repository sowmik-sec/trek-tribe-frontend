"use client";
import {
  AppBar,
  Toolbar,
  Button,
  styled,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import logo from "./logo.png";
import { logoutUser } from "@/services/actions/logoutUser";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";

const LoginButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #3B82F6, #8B5CF6)",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "8px 16px",
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
}));

const SignupButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FFD700, #FF5722)",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "5px",
  textTransform: "none",
  marginLeft: "1rem",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    background: "linear-gradient(45deg, #FFC107, #E64A19)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  "&:focus": {
    outline: "2px solid #FFFFFF",
    outlineOffset: "2px",
  },
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #26A69A, #00BCD4)",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "5px",
  textTransform: "none",
  marginLeft: "1rem",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    background: "linear-gradient(45deg, #00897B, #00ACC1)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  "&:focus": {
    outline: "2px solid #FFFFFF",
    outlineOffset: "2px",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #6A1B9A, #B0BEC5)",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "5px",
  textTransform: "none",
  marginLeft: "1rem",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    background: "linear-gradient(45deg, #4A148C, #90A4AE)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  "&:focus": {
    outline: "2px solid #FFFFFF",
    outlineOffset: "2px",
  },
}));

const NavLinkButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "#FFFFFF",
  "&:hover": { color: "#81C784", background: "transparent" },
}));

const Navbar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const isAuthenticated = !!useUserInfo();
  const router = useRouter();
  const theme = useTheme(); // Access MUI theme for breakpoint debugging
  const currentUserInfo = !!useUserInfo();
  useEffect(() => {
    setIsAuthenticated(!!currentUserInfo);
  }, [currentUserInfo]);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logoutUser(router);
    setIsAuthenticated(false);
    handleClose();
  };

  // Debug breakpoint changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      console.log("Window width:", width);
      console.log("md breakpoint:", theme.breakpoints.values.md);
      console.log("lg breakpoint:", theme.breakpoints.values.lg);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, [theme.breakpoints.values]);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#4CAF50", borderRadius: 0 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <Image
            src={logo}
            alt="Travel Buddy Logo"
            width={120}
            height={40}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
        {/* Right side: Navigation Buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Links visible on lg and up */}
          <Box
            sx={{
              display: {
                xs: "none", // Hidden on extra-small
                sm: "none", // Hidden on small
                md: "none", // Hidden on medium
                lg: "flex", // Shown on large and up
              },
              alignItems: "center",
            }}
          >
            <Link href="/" passHref>
              <NavLinkButton>Home</NavLinkButton>
            </Link>
            <Link href="/find-a-buddy" passHref>
              <NavLinkButton>Find a Buddy</NavLinkButton>
            </Link>
            <Link href="/trips" passHref>
              <NavLinkButton>Trips</NavLinkButton>
            </Link>
            <Link href="/about" passHref>
              <NavLinkButton>About Us</NavLinkButton>
            </Link>
            <Link href="/contact" passHref>
              <NavLinkButton>Contact</NavLinkButton>
            </Link>
          </Box>
          {/* Hamburger menu for md and smaller screens */}
          <Box
            sx={{
              display: {
                xs: "flex", // Shown on extra-small
                sm: "flex", // Shown on small
                md: "flex", // Shown on medium
                lg: "none", // Hidden on large and up
              },
              alignItems: "center",
            }}
          >
            <IconButton color="inherit" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} href="/">
                Home
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                href="/find-a-buddy"
              >
                Find a Buddy
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} href="/trips">
                Trips
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} href="/about">
                About Us
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} href="/contact">
                Contact
              </MenuItem>
            </Menu>
          </Box>
          {/* Action buttons (always visible) */}
          {!isAuthenticated && (
            <Link href="/login" passHref>
              <LoginButton variant="contained">Login</LoginButton>
            </Link>
          )}
          {!isAuthenticated && (
            <Link href="/signup" passHref>
              <SignupButton variant="contained">Signup</SignupButton>
            </Link>
          )}
          {isAuthenticated && (
            <Link href="/profile" passHref>
              <ProfileButton variant="contained">My Profile</ProfileButton>
            </Link>
          )}
          {isAuthenticated && (
            <LogoutButton variant="contained" onClick={handleLogOut}>
              Logout
            </LogoutButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

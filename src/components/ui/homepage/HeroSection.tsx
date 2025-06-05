'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const HeroSection: React.FC = () => {
    const router = useRouter();

    const handleShareTripClick = () => {
        const isAuthenticated = false; // Replace with your auth logic
        router.push(isAuthenticated ? '/trips' : '/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: 'url("/hero.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <Container
                maxWidth="md"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: { xs: '100%', sm: '90%', md: '80%' },
                }}
            >
                {/* Placeholder for potential content like title or description */}
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
                        mb: { xs: 2, sm: 3 },
                    }}
                >
                    Welcome to Your Travel Journey
                </Typography>
            </Container>

            {/* Share Your Trip Button - Positioned at Bottom-Mid */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    pb: { xs: 3, sm: 4, md: 5 },
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleShareTripClick}
                    sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1, sm: 1.5, md: 2 },
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                        },
                    }}
                >
                    Share Your Trip
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;
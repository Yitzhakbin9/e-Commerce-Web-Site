import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import '../Css/styles.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import { login, errorMsgFromFirebaseAuth } from '../Firebase/firebaseAuth'
import usersRepo from '../Repos/usersRepo'



const LogIn = () => {

    const [user, setUser] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate();


    async function handleClick() {

        let userCred
        try {
            userCred = await login(user.email, user.password);
            console.log("Logged in!");
        } catch (e) {
            setError(errorMsgFromFirebaseAuth(e.code));
            return
        }
        const uid = userCred.user.uid;
        const userDocSnapshot = await usersRepo.getUserById(uid);

        try {
            // Check if document exists
            if (!userDocSnapshot.exists()) {
                setError("User profile not found. Please contact support.");
                return;
            }

            const userData = userDocSnapshot.data();
            const role = userData.role;

            if (role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/customer')
            }
        } catch (e) {
            console.error("Error fetching user role:", e);
            setError("An error occurred while fetching user data. Please try again.");
            return;
        }
    }


    return (
        <div className="page">
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        background: 'white',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, color: '#667eea' }}>
                        Welcome Back
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={user.email}
                            onChange={(e) => {
                                setUser({ ...user, email: e.target.value });
                                setError('');
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                    },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                                setError('');
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#667eea',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea',
                                    },
                                },
                            }}
                        />

                        {error && (
                            <Typography sx={{ color: '#d32f2f', fontSize: '0.9rem' }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            onClick={handleClick}
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Don't have an account?{' '}
                            <Link
                                href="/registration"
                                sx={{
                                    color: '#667eea',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Sign up here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}


export default LogIn
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import '../../Css/styles.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import usersRepo from '../../Repos/usersRepo'

const MyAccount = () => {

    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', userName: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();


    async function handleClick() {
        // Validation
        if (!newUser.firstName || !newUser.lastName || !newUser.userName || !newUser.email || !newUser.password) {
            setError('All fields are required');
            return;
        }

        if (newUser.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const userCred = await register(newUser.email, newUser.password);
            const userAdded = await usersRepo.createUserDoc(userCred.user.uid, {
                [USER_FIELDS.EMAIL]: newUser.email,
                [USER_FIELDS.ROLE]: "user",
                [USER_FIELDS.CREATED_AT]: new Date(),
                [USER_FIELDS.NAME]: newUser.firstName + " " + newUser.lastName,
                [USER_FIELDS.USER_NAME]: newUser.userName,
            });

            console.log("new user added -->  ", userAdded)

            setSuccess(true);
            setTimeout(() => {
                navigate('/customer')
            }, 1500);

        } catch (e) {
            setError(errorMsgFromFirebaseAuth(e.code));
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
                        background: 'white'
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, color: '#667eea', textAlign: 'center' }}>
                        Create Account
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            value={newUser.firstName}
                            onChange={(e) => {
                                setNewUser({ ...newUser, firstName: e.target.value });
                                setError('');
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            value={newUser.lastName}
                            onChange={(e) => {
                                setNewUser({ ...newUser, lastName: e.target.value });
                                setError('');
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            value={newUser.userName}
                            onChange={(e) => {
                                setNewUser({ ...newUser, userName: e.target.value });
                                setError('');
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => {
                                setNewUser({ ...newUser, email: e.target.value });
                                setError('');
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => {
                                setNewUser({ ...newUser, password: e.target.value });
                                setError('');
                            }}
                            helperText="At least 6 characters"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />

                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}

                        {success && (
                            <Alert severity="success">Registration successful! Redirecting...</Alert>
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
                            Create Account
                        </Button>

                        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 2 }}>
                            Already have an account?{' '}
                            <Typography
                                component="a"
                                href="/login"
                                sx={{
                                    color: '#667eea',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Log in
                            </Typography>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default MyAccount
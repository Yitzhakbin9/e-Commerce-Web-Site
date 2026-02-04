import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import '../../Css/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import usersRepo from '../../Repos/usersRepo'
import { USER_FIELDS } from '../../Constants/fields.js'

const MyAccount = () => {

    const { uid } = useParams();
    const [newUser, setNewUser] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        if (!uid) return;
        const loadUser = async () => {
            const userData = await usersRepo.getUserById(uid);
            setNewUser(userData.data());
        };
        loadUser();
    }, [uid]);


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

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>First Name:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newUser[USER_FIELDS.FIRST_NAME]}
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
                        </Box>

                        <Box>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>Last Name:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newUser[USER_FIELDS.LAST_NAME]}
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
                        </Box>

                        <Box>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>User Name:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newUser[USER_FIELDS.USER_NAME]}
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
                        </Box>

                        <Box>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>Password:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                value={newUser[USER_FIELDS.PASSWORD]}
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
                        </Box>

                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}

                        {success && (
                            <Alert severity="success">Account updated successfully! Redirecting...</Alert>
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
                            Update Account
                        </Button>

                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default MyAccount
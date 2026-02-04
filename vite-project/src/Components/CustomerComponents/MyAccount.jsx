import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import '../../Css/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from "react"
import usersRepo from '../../Repos/usersRepo'
import { USER_FIELDS } from '../../Constants/fields.js'
import Alert from '@mui/material/Alert';
import { errorMsgFromFirebaseAuth } from '../../Firebase/firebaseAuth.js';


const MyAccount = () => {

    const { uid } = useParams();
    const [newUser, setNewUser] = useState({})
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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
        if (!newUser[USER_FIELDS.FIRST_NAME] || !newUser[USER_FIELDS.LAST_NAME] || !newUser[USER_FIELDS.USER_NAME] || !newUser[USER_FIELDS.EMAIL]) {
            setError('All fields are required');
            return;
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill all password fields');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }


        try {
            const userUpdated = await usersRepo.updateUser(uid, {
                [USER_FIELDS.FIRST_NAME]: newUser[USER_FIELDS.FIRST_NAME],
                [USER_FIELDS.LAST_NAME]: newUser[USER_FIELDS.LAST_NAME],
                [USER_FIELDS.USER_NAME]: newUser[USER_FIELDS.USER_NAME],
                [USER_FIELDS.EMAIL]: newUser[USER_FIELDS.EMAIL],
            });

            if (newPassword) {
                await usersRepo.updateUserPassword(currentPassword, newPassword);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate(`/customer/${uid}/items`);
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
                        Update Account
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>First Name:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newUser[USER_FIELDS.FIRST_NAME]}
                                onChange={(e) => {
                                    setNewUser({ ...newUser, [USER_FIELDS.FIRST_NAME]: e.target.value });
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
                                    setNewUser({ ...newUser, [USER_FIELDS.LAST_NAME]: e.target.value });
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
                                    setNewUser({ ...newUser, [USER_FIELDS.USER_NAME]: e.target.value });
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
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>Current Password:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
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
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>New Password:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
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

                        <Box>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>Confirm New Password:</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
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
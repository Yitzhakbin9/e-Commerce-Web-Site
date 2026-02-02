import { useEffect, useState } from "react"
import usersRepo from '../../Repos/usersRepo.js'
import { USER_FIELDS, ORDERS_FIELDS } from '../../Constants/fields.js'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'


const Customers = () => {

    const [users, setUsers] = useState([])


    useEffect(() => {
        const unsubscribe = usersRepo.getAllUsers((usersFromDb) => {
            setUsers(usersFromDb);
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        console.log(users);
    }, [users]);


    const getProductCount = (products) => {
        return products ? products.length : 0
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                    Customers
                </Typography>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <TableContainer component={Paper} elevation={2}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                                    Full Name
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} align="center">
                                    Joined At
                                </TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} align="center">
                                    Total Purchases
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: '#f8f9fa',
                                            },
                                            '&:hover': {
                                                backgroundColor: '#e8edf7',
                                                cursor: 'pointer'
                                            },
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        <TableCell sx={{ py: 2, fontWeight: '500', color: '#333' }}>
                                            {user[USER_FIELDS.NAME]}
                                        </TableCell>
                                        <TableCell align="center" sx={{ py: 2, color: '#666' }}>
                                            {user[USER_FIELDS.CREATED_AT]}
                                        </TableCell>
                                        <TableCell align="center" sx={{ py: 2 }}>
                                            <Box
                                                sx={{
                                                    display: 'inline-block',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                {getProductCount(user[ORDERS_FIELDS.PRODUCTS])}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: '#999' }}>
                                        No customers found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
}

export default Customers

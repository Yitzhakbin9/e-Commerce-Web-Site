import { useEffect, useState } from "react"
import usersRepo from '../../Repos/usersRepo.js'
import ordersRepo from '../../Repos/ordersRepo.js'
import { USER_FIELDS, ORDER_PRODUCT_FIELDS } from '../../Constants/fields.js'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'
import GenericTableComponent from "../GenericTableComponent.jsx"
import { useMemo } from "react"

const Customers = () => {

    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])

    const headersForProductsTable = [
        { key: "products", label: "Products" },
        { key: "qty", label: "Qty" },
        { key: "date", label: "Date" }
    ];


    useEffect(() => {
        const unsubscribe = usersRepo.getAllUsers((usersFromDb) => {
            setUsers(usersFromDb);
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        const unsubscribe = ordersRepo.getAllOrders((ordersFromDb) => {
            setOrders(ordersFromDb);
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        // console.log("users :", users);
        // console.log("orders :", orders);
    }, [users]);

    // We use useMemo beacause we need this function to run only if users or orders 
    // changed and not on every render
    // This function combines users with their orders. The reason we do this here is because
    // Firestore does not support joins / aggregations like SQL databases do.
    const usersWithOrders = useMemo(() => {
        const ordersByUserId = new Map();
        orders.forEach(order => {
            if (!ordersByUserId.has(order.userId)) {
                ordersByUserId.set(order.userId, []);
            }
            ordersByUserId.get(order.userId).push(order);
        });

        return users.map(user => ({
            ...user,
            orders: ordersByUserId.get(user.id) || []
        }));
    }, [users, orders]);


    useEffect(() => {
        // console.log("usersWithOrders :", usersWithOrders);
    }, [usersWithOrders]);



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
                                    Products Purchased
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (

                                users.map((user, index) => {

                                    console.log("usersWithOrders", usersWithOrders);
                                    const userOrders = usersWithOrders.find(u => u.id === user.id)?.orders || [];

                                    console.log("userOrders for user", userOrders);

                                    const tableRows = userOrders.flatMap(({ createdAt, products }) =>
                                        (products ?? []).map(p => ({
                                            products: p[ORDER_PRODUCT_FIELDS.NAME],
                                            qty: p[ORDER_PRODUCT_FIELDS.QUANTITY],
                                            date: createdAt?.toDate().toLocaleDateString('he-IL'),
                                        }))
                                    );

                                    console.log("tableRows", tableRows);

                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: '#f8f9fa',
                                                },
                                                '&:hover': {
                                                    backgroundColor: '#e8edf7',
                                                },
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <TableCell sx={{ py: 2, fontWeight: '500', color: '#333' }}>
                                                {user[USER_FIELDS.FIRST_NAME] + " " + user[USER_FIELDS.LAST_NAME]}
                                            </TableCell>
                                            <TableCell align="center" sx={{ py: 2, color: '#666' }}>
                                                {user[USER_FIELDS.CREATED_AT]}
                                            </TableCell>
                                            <TableCell align="center" sx={{ py: 2 }}>

                                                {<GenericTableComponent
                                                    headers={headersForProductsTable}
                                                    tableRow={tableRows}
                                                    isNested={true} />}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
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

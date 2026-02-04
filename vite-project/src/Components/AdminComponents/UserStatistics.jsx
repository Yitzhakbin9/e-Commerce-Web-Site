import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { Box, Container, Paper, Autocomplete, TextField, Typography } from '@mui/material'
import usersRepo from '../../Repos/usersRepo.js'
import { useEffect, useState } from "react"
import { USER_FIELDS, ORDERS_FIELDS } from '../../Constants/fields.js'
import ordersRepo from '../../Repos/ordersRepo.js'
import { useMemo } from "react"


const UserStatistics = () => {

    const [users, setUsers] = useState([])
    const [usersWithOrders, setUsersWithOrders] = useState([])
    const [chosenUser, setChosenUser] = useState({})
    const [barNames, setBarNames] = useState([])
    const [barQty, setBarQty] = useState([])
    const [orders, setOrders] = useState([])


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

    // This useMemo combines users with their orders.
    const usersWithOrdersInfo = useMemo(() => {
        const ordersByUserId = new Map();
        orders.forEach(order => {
            if (!ordersByUserId.has(order.userId)) {
                ordersByUserId.set(order.userId, []);
            }
            ordersByUserId.get(order.userId).push(order);
        });

        const result = users.map(user => ({
            ...user,
            orders: ordersByUserId.get(user.id) || []
        }));

        setUsersWithOrders(result);
        return result;
    }, [users, orders]);



    useEffect(() => {

        const userOrders = usersWithOrders.find(user => user.id === chosenUser.id)?.orders || [];
        const userProducts = userOrders.flatMap(order => order.products || []);

        const chartData = userProducts.map(p => ({
            name: p.name,
            quantity: p.quantity
        }));
        setBarNames(chartData.map(d => d.name));
        setBarQty(chartData.map(d => d.quantity));
    }, [chosenUser])


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                    User Purchase Statistics
                </Typography>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
                        Select User
                    </Typography>
                    <Autocomplete
                        sx={{
                            width: '100%',
                            maxWidth: 300,
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#667eea'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#667eea'
                                }
                            },
                            '& .MuiAutocomplete-listbox': {
                                maxHeight: '200px'
                            }
                        }}
                        disablePortal
                        options={users}
                        getOptionLabel={(user) => user?.[USER_FIELDS.FIRST_NAME] + ' ' + user?.[USER_FIELDS.LAST_NAME] || ''}
                        renderInput={(params) => <TextField {...params} label="Choose a user" />}
                        onChange={(event, newValue) => {
                            console.log("Selected user:", newValue);
                            if (!newValue) {
                                setChosenUser({ id: '' }); // we dont want null here
                            } else {
                                setChosenUser(newValue);
                            }
                        }}
                    />
                </Paper>

                {chosenUser && barQty.length > 0 && barQty[0] !== 0 && (
                    <Paper elevation={2} sx={{ p: 3, background: '#f8f9fa', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: '#333', fontWeight: '600' }}>
                            Purchase History: {chosenUser?.[USER_FIELDS.NAME]}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
                            <BarChart
                                xAxis={[{ id: 'barCategories', data: barNames, scaleType: 'band' }]}
                                series={[{
                                    data: barQty,
                                    color: '#667eea'
                                }]}
                                width={600}
                                height={400}
                                margin={{ top: 10, bottom: 30, left: 60, right: 10 }}
                            />
                        </Box>
                    </Paper>
                )}

                {(!chosenUser || (barQty.length === 1 && barQty[0] === 0)) && (
                    <Paper elevation={2} sx={{ p: 4, textAlign: 'center', background: '#f8f9fa' }}>
                        <Typography variant="body1" sx={{ color: '#999' }}>
                            {chosenUser ? `${chosenUser} has no purchases yet` : 'Select a user to view their purchase statistics'}
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Container>
    )
}

export default UserStatistics

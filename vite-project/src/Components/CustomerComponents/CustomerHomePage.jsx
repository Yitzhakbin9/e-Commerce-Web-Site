import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import '../../Css/styles.css';
import FaceIcon from '@mui/icons-material/Face';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"


const CustomerHomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Map route to tab value
    const getTabValue = () => {
        if (location.pathname.includes('items')) return 0;
        if (location.pathname.includes('orders')) return 1;
        if (location.pathname.includes('account')) return 2;
        if (location.pathname.includes('logout')) return 3;
        return 0;
    };

    const [value, setValue] = useState(getTabValue());

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const routes = ['/items', '/orders', '/account', '/logout'];
        navigate('/customer' + routes[newValue]);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 4
        }}>
            <Container maxWidth="xl">
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        p: 3,
                        textAlign: 'center'
                    }}>
                        <Typography variant="h3" sx={{ fontWeight: 700 }}>
                            Customer Dashboard
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
                            Manage your account and orders
                        </Typography>
                    </Box>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        sx={{
                            background: 'white',
                            borderBottom: '2px solid #f0f0f0',
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 500,
                                py: 2,
                                color: '#666',
                                '&.Mui-selected': {
                                    color: '#667eea',
                                    fontWeight: 600,
                                }
                            },
                            '& .MuiTabs-indicator': {
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                height: 3
                            }
                        }}
                    >
                        <Tab icon={<StorefrontIcon />} label="Products" iconPosition="start" />
                        <Tab icon={<DataUsageIcon />} label="My Orders" iconPosition="start" />
                        <Tab icon={<FaceIcon />} label="My Account" iconPosition="start" />
                        <Tab icon={<CategoryIcon />} label="Log Out" iconPosition="start" />
                    </Tabs>

                    <Box sx={{ p: 4, minHeight: '500px' }}>
                        <Outlet />
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

export default CustomerHomePage
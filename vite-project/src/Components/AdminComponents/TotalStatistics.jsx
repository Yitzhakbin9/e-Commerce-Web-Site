import React from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import categoriesRepo from '../../Repos/categoriesRepo.js'


const TotalStatistics = () => {


    const [categories, setCategories] = useState([])
    const [newCategoryName, setNewCategoryName] = useState('');


    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category);
        });
        return () => unsubscribe();
    }, [])

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const colors = [
        '#667eea', '#764ba2', '#FF6B6B', '#4ECDC4',
        '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3',
        '#A8D8EA', '#FFABAB', '#FFC3A0', '#FFDAC1',
        '#B4A7D6', '#D4A5A5', '#9CAFB7', '#E2C2B9'
    ];

    const data = categories.map((c, index) => ({
        label: c.name,
        value: 200,
        color: colors[index % colors.length]
    }));

    const sizing = {
        margin: { right: 5 },
        width: 500,
        height: 400,
        hideLegend: false,
    };

    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    // debugger;
    // const a = categories.map(c => c.name);
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Typography variant="h4" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                    Category Distribution
                </Typography>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Paper elevation={2} sx={{ p: 3, background: '#f8f9fa', display: 'flex', justifyContent: 'center', borderRadius: 2 }}>
                    <PieChart
                        series={[
                            {
                                outerRadius: 120,
                                data,
                                arcLabel: getArcLabel,
                                valueFormatter: (value) => `${value} items`,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14,
                                fontWeight: 'bold',
                            },
                        }}
                        {...sizing}
                    />
                </Paper>

                <Paper elevation={2} sx={{ p: 3, mt: 3, background: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: '600' }}>
                        Summary
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
                        {data.map((item) => (
                            <Box
                                key={item.label}
                                sx={{
                                    p: 2,
                                    background: 'white',
                                    borderRadius: 1,
                                    textAlign: 'center',
                                    border: `2px solid ${item.color}`,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <Box sx={{ width: 12, height: 12, background: item.color, borderRadius: '50%', mx: 'auto', mb: 1 }}></Box>
                                <Typography variant="body2" sx={{ fontWeight: '600', color: '#333' }}>
                                    {item.label}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#999' }}>
                                    {item.value} items
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default TotalStatistics

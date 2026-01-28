import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const GenericTableComponent = (props) => {

    const headers = props.headers
    const tableRow = props.tableRow

    return (
        <TableContainer component={Paper} elevation={2} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        {headers.map(h => (
                            <TableCell 
                                key={h.key}
                                sx={{ 
                                    color: 'white', 
                                    fontWeight: 'bold', 
                                    fontSize: '1rem'
                                }}
                            >
                                {h.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Array.isArray(tableRow) && tableRow.length > 0 ? (
                        tableRow.map((row, index) => (
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
                                {headers.map(h => (
                                    <TableCell 
                                        key={h.key}
                                        sx={{ 
                                            py: 2,
                                            color: '#333'
                                        }}
                                    >
                                        {row[h.key] || '-'}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell 
                                colSpan={headers.length} 
                                align="center" 
                                sx={{ py: 3, color: '#999' }}
                            >
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default GenericTableComponent

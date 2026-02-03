import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'


// This component can build generic tables based on the headers and tableRow props passed to it


const GenericTableComponent = (props) => {

    const headers = props.headers
    const tableRow = props.tableRow
    const isNested = props.isNested || false

    return (
        <TableContainer
            component={Paper}
            elevation={isNested ? 0 : 2}
            sx={{ mt: isNested ? 0 : 3, boxShadow: isNested ? 'none' : undefined }}
        >
            <Table size={isNested ? "small" : "medium"} sx={{ minWidth: isNested ? 200 : 650 }}>
                <TableHead>
                    <TableRow sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: isNested ? '2px solid #000' : undefined
                    }}>
                        {headers.map(h => (
                            <TableCell
                                key={h.key}
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: isNested ? '0.75rem' : '1rem',
                                    py: isNested ? 0.5 : 2,
                                    px: isNested ? 1 : 2,
                                    border: isNested ? '2px solid #000' : undefined
                                }}
                                align={h.key !== headers[0].key ? "center" : "left"}
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
                                        backgroundColor: isNested ? '#fff' : '#f8f9fa',
                                    },
                                    '&:hover': {
                                        backgroundColor: isNested ? '#f9f9f9' : '#e8edf7',
                                    },
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                {headers.map(h => (
                                    <TableCell
                                        key={h.key}
                                        sx={{
                                            py: isNested ? 0.3 : 2,
                                            px: isNested ? 1 : 2,
                                            fontSize: isNested ? '0.75rem' : '1rem',
                                            border: isNested ? '2px solid #000' : undefined
                                        }}
                                        align={h.key !== headers[0].key ? "center" : "left"}
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
                                sx={{
                                    py: isNested ? 0.5 : 3,
                                    px: isNested ? 1 : 2,
                                    color: '#999',
                                    fontSize: isNested ? '0.75rem' : '1rem',
                                    border: isNested ? '2px solid #000' : undefined
                                }}
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

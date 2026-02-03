import React from 'react'
import { useEffect, useState } from "react"
import { USER_FIELDS, ORDERS_FIELDS } from '../../Constants/fields.js'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'
import GenericTableComponent from "../GenericTableComponent.jsx"
import { useMemo } from "react"

const MyOrders = () => {


  const tableRows = []

  const headersForProductsTable = [
    { key: "title", label: "Title" },
    { key: "qty", label: "Qty" },
    { key: "total", label: "Total" },
    { key: "date", label: "Date" }
  ];



  return (
    <div style={{border: "2px blue solid"}}>
      
      
      
      {<GenericTableComponent
        headers={headersForProductsTable}
        tableRow={tableRows}
        isNested={true} />}
      MyOrders</div>
  )
}

export default MyOrders
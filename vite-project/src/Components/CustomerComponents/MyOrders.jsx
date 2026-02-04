import React from 'react'
import { useEffect, useState } from "react"
import { ORDER_PRODUCT_FIELDS, ORDERS_FIELDS } from '../../Constants/fields.js'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'
import GenericTableComponent from "../GenericTableComponent.jsx"
import { useParams } from 'react-router-dom';
import ordersRepo from '../../Repos/ordersRepo.js'
import '../../Css/styles.css';

const MyOrders = () => {


  const { uid } = useParams()
  const [orders, setOrders] = useState([])
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    const unsubscibe = ordersRepo.getAllOrders((orders) => {
      setOrders(orders);
    });
    return () => unsubscibe();
  }, []);


  useEffect(() => {
    console.log("Orders fetched: ", orders);
    const userOrders = orders.filter(order => order[ORDERS_FIELDS.USER_ID] === uid)
    console.log("uid: ", uid);
    console.log("User Orders fetched: ", userOrders);
    setUserOrders(userOrders);
  }, [orders]);



  const tableRows2 = userOrders.flatMap(({ createdAt, products }) =>
    (products ?? []).map(p => ({
      title: p[ORDER_PRODUCT_FIELDS.NAME],
      qty: p[ORDER_PRODUCT_FIELDS.QUANTITY],
      total: p[ORDER_PRODUCT_FIELDS.UNIT_PRICE] * p[ORDER_PRODUCT_FIELDS.QUANTITY],
      date: createdAt?.toDate().toLocaleDateString('he-IL'),
    }))
  );


  const headersForProductsTable = [
    { key: "title", label: "Title" },
    { key: "qty", label: "Qty" },
    { key: "total", label: "Total" },
    { key: "date", label: "Date" }
  ];


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <Box sx={{ mt: 4 }}>
        {userOrders.length > 0 ? (
          <GenericTableComponent
            headers={headersForProductsTable}
            tableRow={tableRows2}
            isNested={true}
          />
        ) : (
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No orders found
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  )
}

export default MyOrders
import React from 'react'
import { useEffect, useState } from "react"
import usersRepo from '../../Repos/usersRepo.js'
import ordersRepo from '../../Repos/ordersRepo.js'
import { USER_FIELDS, ORDERS_FIELDS } from '../../Constants/fields.js'
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material'
import GenericTableComponent from "../GenericTableComponent.jsx"
import { useMemo } from "react"

const Items = () => {



  return (
    <div style={{ border: "2px red solid" }}>
        Products to buy
    
    </div>
  )
}

export default Items
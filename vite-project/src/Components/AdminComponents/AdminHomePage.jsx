import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import '../../Css/styles.css';
import FaceIcon from '@mui/icons-material/Face';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom"


const AdminHomePage = () => {

    const [value, setValue] = useState(0);



    return (
        <div className="page">
            <div className="box">
                <h1>Hello Admin!</h1>
                <Box sx={{ width: 500 }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            // console.log(event.target);
                            // console.log("newValue     " + newValue);
                            <Link to={"/registration"}>Register</Link>

                            // console.log("value" + value);
                            // console.log("value" + value);
                            setValue(newValue);

                        }}

                    >



                        <BottomNavigationAction
                            label="Categories"
                            value="categories"
                            icon={<EditNoteIcon />}
                            component={Link}
                            to="/admin/categories"
                        />
                        <BottomNavigationAction
                            label="Products"
                            value="products"
                            icon={<CheckroomIcon />}
                            component={Link}
                            to="/admin/products"
                        />
                        <BottomNavigationAction
                            label="Customers"
                            value="customers"
                            icon={<FaceIcon />}
                            component={Link}
                            to="/admin/customers"
                        />
                        <BottomNavigationAction
                            label="Statistics"
                            value="statistics"
                            icon={<DataUsageIcon />}
                            component={Link}
                            to="/admin/statistics"
                        />

                    </BottomNavigation>
                </Box>



                {/* import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
    navigate('/stage3'); */}




                <Outlet />
                {/* <Categories/> */}
                {/* <Customers/> */}
                {/* <Products/> */}

            </div>
        </div>

    )
}

export default AdminHomePage
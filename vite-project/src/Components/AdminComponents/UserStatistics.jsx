import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import usersRepo from '../../Repos/usersRepo.js'
import { useEffect, useState } from "react"


const UserStatistics = () => {

    const [users, setUsers] = useState([])
    const [chosenUser, setChosenUser] = useState({})
    const [barNames, setBarNames] = useState(['product'])
    const [barQty, setBarQty] = useState([0])


    useEffect(() => {
        const unsubscribe = usersRepo.getAllUsers((usersFromDb) => {
            setUsers(usersFromDb);
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        const namesOnly = users.map((user) => ({
            name: user.firstName + " " + user.lastName,
        }));
    }, [users]);


    useEffect(() => {
        const chosen = users.filter((user) => user.firstName + " " + user.lastName === chosenUser)
        const products = chosen.flatMap(user => user.products)

        if (products.length > 0) {
            const name = products.map(p => p.name)
            const qty = products.map(p => p.qty)
            setBarNames(name)
            setBarQty(qty)
        } else {
            setBarNames(['products'])
            setBarQty([0])
        }
    }, [chosenUser])


    return (
        <div>UserStatistics
            <br />
            <Autocomplete
                sx={{ width: 180 }}
                disablePortal
                options={users.map((user) => user.firstName + " " + user.lastName)}
                renderInput={(params) => <TextField {...params} label="user" />}
                onChange={(event, newValue) => {
                    setChosenUser(newValue);
                }}
            />
            <br />
            <br />

            <BarChart
                xAxis={[{ id: 'barCategories', data: barNames }]}
                series={[{ data: barQty }]}
                height={300}
            />
        </div>
    )
}

export default UserStatistics
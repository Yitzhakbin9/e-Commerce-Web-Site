import React, { useState, useEffect } from 'react'
import '../../Css/styles.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GenericTableComponent from '../GenericTableComponent.jsx';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import categoriesRepo from '../../Repos/categoriesRepo.js'
import productsRepo from '../../Repos/productsRepo.js'
import { PRODUCTS_FIELDS, CATEGORY_FIELDS } from '../../Constants/fields.js'



const NewProduct = (props) => {


    const [categories, setCategories] = useState([])
    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        description: "",
        price: 0,
        pic: "",
        boughtBy: []
    })

    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category.map((p) => p[CATEGORY_FIELDS.NAME]))
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
    }, [categories])


    function saveNewProductClick() {
        console.log(newProduct)
        productsRepo.addProduct(newProduct)
        props.clicked(false)
    }


    return (

        <div
            style={{
                display: 'flex',
                gap: '40px',
                border: '2px solid black',
                borderRadius: '40px',
                padding: '10px',
            }}>


            {/* LEFT SIDE */}
            <div style={{ flex: 1 }}>

                <br />
                Title: <TextField
                    id="outlined-disabled"
                    type="text"
                    defaultValue="title"
                    size='small'
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}

                />
                <br />
                Price: <TextField
                    id="outlined-disabled"
                    defaultValue="price"
                    type="number"
                    min={0}
                    maxRows={10000}
                    size='small'
                    onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
                />
                <br />
                Category:  <Autocomplete
                    disablePortal
                    options={categories}
                    renderInput={(params) => <TextField {...params} label="category" />}
                    onChange={(event, newValue) => {
                        setNewProduct({ ...newProduct, category: newValue });
                    }}
                />
                <br />
            </div>

            {/* RIGHT SIDE */}
            <div style={{ flex: 1 }}>
                Description: <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    type="text"
                    multiline
                    rows={4}
                    defaultValue="description"
                    onChange={(e) => setNewProduct({ ...newProduct, descreption: e.target.value })}

                />
                <br />

            </div>


            Link To Pic: <TextField
                id="outlined-multiline-static"
                label="Multiline"
                type="text"
                multiline
                rows={4}
                defaultValue="pic"
                onChange={(e) => setNewProduct({ ...newProduct, pic: e.target.value })}

            />
            <br />

            <Button variant="outlined" onClick={saveNewProductClick}>save</Button>

        </div>

    )
}

export default NewProduct
import React from 'react'
import '../../Css/styles.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react"
import productsRepo from '../../Repos/productsRepo.js'
import Product from './Product.jsx'
import NewProduct from './NewProduct.jsx'
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

const Products = () => {

    const [products, setProducts] = useState([])
    const [isAddClicked, setIsAddClicked] = useState(false)

    const changeClick = (data) => setIsAddClicked(data)


    useEffect(() => {
        const unsubscibe = productsRepo.getAllProducts((products) => {
            setProducts(products);
        });

        return () => unsubscibe();
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products])



    function addProductClick() {
        setIsAddClicked(true)
    }

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addProductClick}
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.2
                    }}
                >
                    Add New Product
                </Button>
            </Box>

            {isAddClicked && (
                <Box sx={{ mb: 4 }}>
                    <NewProduct clicked={changeClick} />
                </Box>
            )}

            <Grid container spacing={3}>
                {products.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p.id}>
                        <Product productInfo={p} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Products
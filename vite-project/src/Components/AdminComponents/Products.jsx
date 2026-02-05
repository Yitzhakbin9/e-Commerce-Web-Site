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
import { Paper, Autocomplete, Typography, TextField } from '@mui/material'
import categoriesRepo from '../../Repos/categoriesRepo.js'
import { PRODUCTS_FIELDS, CATEGORY_FIELDS } from '../../Constants/fields.js'



const Products = () => {

    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [isAddClicked, setIsAddClicked] = useState(false)
    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory] = useState({})

    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category);
        });
        return () => unsubscribe();
    }, [])
    const changeClick = (data) => setIsAddClicked(data)


    useEffect(() => {
        const unsubscibe = productsRepo.getAllProducts((products) => {
            setAllProducts(products);
            setProducts(products);
        });
        return () => unsubscibe();
    }, []);



    useEffect(() => {
        if (!chosenCategory?.name) {
            setProducts(allProducts);
            return;
        }
        const filtered = allProducts.filter(
            (p) => p[PRODUCTS_FIELDS.CATEGORY_NAME] === chosenCategory[CATEGORY_FIELDS.NAME]
        );
        setProducts(filtered);
    }, [chosenCategory, allProducts])




    function addProductClick() {
        setIsAddClicked(true)
    }

    return (
        <Box>


            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{ flex: 1, minWidth: '250px' }}>
                        <Typography variant="h6" sx={{ mb: 1.5, color: '#333', fontWeight: '600' }}>
                            Filter by Category
                        </Typography>
                        <Autocomplete
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#667eea'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#667eea'
                                    }
                                },
                                '& .MuiAutocomplete-listbox': {
                                    maxHeight: '200px'
                                }
                            }}
                            disablePortal
                            options={categories}
                            getOptionLabel={(category) => category?.name || ''}
                            renderInput={(params) => <TextField {...params} label="Choose a category" />}
                            onChange={(event, newValue) => {
                                if (!newValue) {
                                    setChosenCategory({ id: '' }); // we dont want null here
                                } else {
                                    setChosenCategory(newValue);
                                }
                            }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={addProductClick}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.5,
                            px: 3,
                            alignSelf: 'flex-end',
                            mb: 0.5
                        }}
                    >
                        Add New Product
                    </Button>
                </Box>
            </Paper>


            {isAddClicked && (
                <Box sx={{ mb: 4 }}>
                    <NewProduct clicked={changeClick} />
                </Box>
            )}

            <Grid container spacing={3}>
                {products.map((p) => (
                    <Grid item xs={4} sm={3} md={2} key={p.id}>
                        <Product productInfo={p} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Products
import React, { useState, useEffect } from 'react'
import '../../Css/styles.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import categoriesRepo from '../../Repos/categoriesRepo.js'
import productsRepo from '../../Repos/productsRepo.js'
import { PRODUCTS_FIELDS, CATEGORY_FIELDS } from '../../Constants/fields.js'


const NewProduct = (props) => {

    const [categories, setCategories] = useState([])
    const [newProduct, setNewProduct] = useState({
        [PRODUCTS_FIELDS.NAME]: '',
        [PRODUCTS_FIELDS.DESCRIPTION]: '',
        [PRODUCTS_FIELDS.IMG_URL]: '',
        [PRODUCTS_FIELDS.IS_ACTIVE]: true,
        [PRODUCTS_FIELDS.NAME]: '',
        [PRODUCTS_FIELDS.PRICE]: 0,
        [PRODUCTS_FIELDS.STOCK_QTY]: 0,
        [PRODUCTS_FIELDS.CATEGORY_NAME]: ''
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category.map((p) => p[CATEGORY_FIELDS.NAME]))
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        console.log(categories)
    }, [categories]);

    useEffect(() => {
        console.log(newProduct)
    }, [newProduct]);





    function validateForm() {
        const newErrors = {};
        if (!newProduct[PRODUCTS_FIELDS.NAME].trim()) newErrors[PRODUCTS_FIELDS.NAME] = "Name is required";
        if (!newProduct[PRODUCTS_FIELDS.CATEGORY_NAME]) newErrors[PRODUCTS_FIELDS.CATEGORY_NAME] = "Category is required";
        if (!newProduct[PRODUCTS_FIELDS.DESCRIPTION].trim()) newErrors[PRODUCTS_FIELDS.DESCRIPTION] = "Description is required";
        if (newProduct[PRODUCTS_FIELDS.PRICE] <= 0) newErrors[PRODUCTS_FIELDS.PRICE] = "Price must be greater than 0";
        if (newProduct[PRODUCTS_FIELDS.STOCK_QTY] <= 0) newErrors[PRODUCTS_FIELDS.STOCK_QTY] = "Quantity must be greater than 0";
        return newErrors;
    }

    function saveNewProductClick() {
        debugger
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log(newProduct)
        productsRepo.addProduct(newProduct)
        props.clicked(false)
    }

    function handleCancel() {
        props.clicked(false)
    }

    return (
        <Card
            sx={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                mb: 3
            }}
        >
            <CardContent>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#667eea' }}>
                    Add New Product
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Product Title"
                            variant="outlined"
                            value={newProduct[PRODUCTS_FIELDS.NAME]}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, [PRODUCTS_FIELDS.NAME]: e.target.value });
                                setErrors({ ...errors, [PRODUCTS_FIELDS.NAME]: '' });
                            }}
                            error={!!errors[PRODUCTS_FIELDS.NAME]}
                            helperText={errors[PRODUCTS_FIELDS.NAME]}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            variant="outlined"
                            value={newProduct[PRODUCTS_FIELDS.PRICE]}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, [PRODUCTS_FIELDS.PRICE]: +e.target.value });
                                setErrors({ ...errors, [PRODUCTS_FIELDS.PRICE]: '' });
                            }}
                            error={!!errors[PRODUCTS_FIELDS.PRICE]}
                            helperText={errors[PRODUCTS_FIELDS.PRICE]}
                            inputProps={{ step: "0.01", min: "0" }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Quantity"
                            variant="outlined"
                            value={newProduct[PRODUCTS_FIELDS.STOCK_QTY]}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, [PRODUCTS_FIELDS.STOCK_QTY]: +e.target.value });
                                setErrors({ ...errors, [PRODUCTS_FIELDS.STOCK_QTY]: '' });
                            }}
                            error={!!errors[PRODUCTS_FIELDS.STOCK_QTY]}
                            helperText={errors[PRODUCTS_FIELDS.STOCK_QTY]}
                            inputProps={{ step: "0.01", min: "0" }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            fullWidth
                            options={categories}
                            value={newProduct[PRODUCTS_FIELDS.CATEGORY_NAME]}
                            onChange={(event, newValue) => {
                                setNewProduct({ ...newProduct, [PRODUCTS_FIELDS.CATEGORY_NAME]: newValue });
                                setErrors({ ...errors, [PRODUCTS_FIELDS.CATEGORY_NAME]: '' });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    error={!!errors[PRODUCTS_FIELDS.CATEGORY_NAME]}
                                    helperText={errors[PRODUCTS_FIELDS.CATEGORY_NAME]}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': { borderColor: '#667eea' },
                                            '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            variant="outlined"
                            value={newProduct[PRODUCTS_FIELDS.IMG_URL]}
                            onChange={(e) => setNewProduct({ ...newProduct, [PRODUCTS_FIELDS.IMG_URL]: e.target.value })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={newProduct[PRODUCTS_FIELDS.DESCRIPTION]}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, [PRODUCTS_FIELDS.DESCRIPTION]: e.target.value });
                                setErrors({ ...errors, [PRODUCTS_FIELDS.DESCRIPTION]: '' });
                            }}
                            error={!!errors[PRODUCTS_FIELDS.DESCRIPTION]}
                            helperText={errors[PRODUCTS_FIELDS.DESCRIPTION]}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#667eea' },
                                    '&.Mui-focused fieldset': { borderColor: '#667eea' },
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={saveNewProductClick}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.2,
                                }}
                            >
                                Save Product
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                onClick={handleCancel}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    color: '#999',
                                    borderColor: '#ccc'
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default NewProduct

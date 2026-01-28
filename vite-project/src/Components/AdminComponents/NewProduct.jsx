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
        title: "",
        category: "",
        description: "",
        price: 0,
        pic: "",
        boughtBy: []
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category.map((p) => p[CATEGORY_FIELDS.NAME]))
        });
        return () => unsubscribe();
    }, []);

    function validateForm() {
        const newErrors = {};
        if (!newProduct.title.trim()) newErrors.title = "Title is required";
        if (!newProduct.category) newErrors.category = "Category is required";
        if (!newProduct.description.trim()) newErrors.description = "Description is required";
        if (newProduct.price <= 0) newErrors.price = "Price must be greater than 0";
        return newErrors;
    }

    function saveNewProductClick() {
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
                            value={newProduct.title}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, title: e.target.value });
                                setErrors({ ...errors, title: '' });
                            }}
                            error={!!errors.title}
                            helperText={errors.title}
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
                            value={newProduct.price}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, price: +e.target.value });
                                setErrors({ ...errors, price: '' });
                            }}
                            error={!!errors.price}
                            helperText={errors.price}
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
                            value={newProduct.category}
                            onChange={(event, newValue) => {
                                setNewProduct({ ...newProduct, category: newValue });
                                setErrors({ ...errors, category: '' });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    error={!!errors.category}
                                    helperText={errors.category}
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
                            value={newProduct.pic}
                            onChange={(e) => setNewProduct({ ...newProduct, pic: e.target.value })}
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
                            value={newProduct.description}
                            onChange={(e) => {
                                setNewProduct({ ...newProduct, description: e.target.value });
                                setErrors({ ...errors, description: '' });
                            }}
                            error={!!errors.description}
                            helperText={errors.description}
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

import { useState, useEffect } from 'react';
import Category from './Category.jsx'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import categoriesRepo from '../../Repos/categoriesRepo.js'
import '../../Css/styles.css';


const Categories = () => {

    const [categories, setCategories] = useState([])
    const [newCategoryName, setNewCategoryName] = useState('');


    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category);
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        console.log(categories);
    }, [categories]);

    function handleClick() {
        if (newCategoryName.trim() !== '') {
            categoriesRepo.addCategory(newCategoryName);
            setNewCategoryName('');
        }
    }


    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap'
                }}>
                    <TextField
                        label="Enter category name"
                        variant="outlined"
                        size="small"
                        value={newCategoryName}
                        onChange={(event) => {
                            setNewCategoryName(event.target.value);
                        }}
                        sx={{
                            flex: 1,
                            minWidth: '200px',
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': { borderColor: '#667eea' },
                                '&.Mui-focused fieldset': { borderColor: '#667eea' },
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleClick}
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Add Category
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={2}>
                {categories.map((c) => (
                    <Grid item xs={12} sm={6} md={4} key={c.id}>
                        <Category categoryInfo={c} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Categories
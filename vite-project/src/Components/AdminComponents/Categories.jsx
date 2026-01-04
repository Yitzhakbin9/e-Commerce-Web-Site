import { useState, useEffect } from 'react';
import Category from './Category.jsx'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import categoriesRepo from '../../Repos/categoriesRepo.js'
import '../../Css/styles.css';


const Categories = () => {

    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState('');


    useEffect(() => {
        const unsubscribe = categoriesRepo.getAllCategories((category) => {
            setCategories(category);
        });
        return () => unsubscribe();
    }, [])


    useEffect(() => {
    }, [categories])


    function handleClick() {
        categoriesRepo.addCategory(categoryName);
    }


    return (
        <>
            <div className="categories">
                <h1>Categories</h1>
                {categories.map((c) => (
                    <Category key={c.id} categoryInfo={c} />
                ))}

            </div>

            <div>
                <Button variant="outlined" onClick={handleClick}>Add New Category</Button>
                <TextField id="outlined-basic"
                    label="Enter category name"
                    variant="outlined"
                    size="small"
                    onChange={(event) => {
                        setCategoryName(event.target.value);
                    }}
                    style={{ width: "250px" }}
                />
            </div>
        </>
    )
}

export default Categories
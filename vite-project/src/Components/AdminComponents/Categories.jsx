import { useState, useEffect } from 'react';
import Category from './Category.jsx'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
        debugger
        if (newCategoryName.trim() !== '') {
            categoriesRepo.addCategory(newCategoryName);
            setNewCategoryName('');
        }
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
                <TextField id="outlined-basic"
                    label="Enter category name"
                    variant="outlined"
                    size="small"
                    value={newCategoryName}
                    onChange={(event) => {
                        setNewCategoryName(event.target.value);
                    }}
                    style={{ width: "250px" }}
                />
                <Button variant="outlined" onClick={handleClick}>Add New Category</Button>
            </div>
        </>
    )
}

export default Categories
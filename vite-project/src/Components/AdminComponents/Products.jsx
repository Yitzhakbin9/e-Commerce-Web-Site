import React from 'react'
import '../../Css/styles.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import productsRepo from '../../Repos/productsRepo.js'
import Product from './Product.jsx'
import NewProduct from './NewProduct.jsx'

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
    }, [products])



    function addProductClick() {
        setIsAddClicked(true)
    }

    return (

        <div >

            {products.map((p) => (
                <Product key={p.id} productInfo={p} />
            ))}


            <Button variant="outlined" onClick={addProductClick}>Add New Product</Button>

            {isAddClicked ?
                <NewProduct clicked={changeClick} /> :
                null
            }

        </div>
    )
}

export default Products
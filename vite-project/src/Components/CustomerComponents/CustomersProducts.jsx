import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import productsRepo from "../../Repos/productsRepo.js";
import { PRODUCTS_FIELDS } from "../../Constants/fields.js";
import CustomerProductCard from "./CustomerProductCard.jsx";
import ProductsFilterBar from "./ProductsFilterBar.jsx";

const CustomersProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = productsRepo.getAllProducts((productsFromDb) => {
      setProducts(productsFromDb);
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product[PRODUCTS_FIELDS.NAME] ?? "";

    return productName.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#2f3b66", mb: 1 }}>
        Products
      </Typography>

      <Typography variant="body1" sx={{ color: "#5f6b91", mb: 4 }}>
        All products from Firestore are shown here.
      </Typography>

      <ProductsFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <CustomerProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomersProducts;

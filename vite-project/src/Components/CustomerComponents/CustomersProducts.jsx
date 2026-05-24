import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import categoriesRepo from "../../Repos/categoriesRepo.js";
import productsRepo from "../../Repos/productsRepo.js";
import {
  CATEGORY_FIELDS,
  PRODUCTS_FIELDS,
} from "../../Constants/fields.js";
import CustomerProductCard from "./CustomerProductCard.jsx";
import ProductsCategoryFilter from "./ProductsCategoryFilter.jsx";
import ProductsFilterBar from "./ProductsFilterBar.jsx";

const CustomersProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const unsubscribe = productsRepo.getAllProducts((productsFromDb) => {
      setProducts(productsFromDb);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = categoriesRepo.getAllCategories((categoriesFromDb) => {
      setCategories(categoriesFromDb);
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product[PRODUCTS_FIELDS.NAME] ?? "";
    const productCategory = product[PRODUCTS_FIELDS.CATEGORY_NAME] ?? "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchesCategory =
      selectedCategory === "all" ||
      productCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#2f3b66", mb: 1 }}>
        Products
      </Typography>

      <Typography variant="body1" sx={{ color: "#5f6b91", mb: 4 }}>
        All products from Firestore are shown here.
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="stretch"
      >
        <Box sx={{ flex: 1 }}>
          <ProductsFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <ProductsCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </Box>
      </Stack>

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

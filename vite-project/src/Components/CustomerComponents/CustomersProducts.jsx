import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import productsRepo from "../../Repos/productsRepo.js";
import { PRODUCTS_FIELDS } from "../../Constants/fields.js";

const CustomersProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = productsRepo.getAllProducts((productsFromDb) => {
      setProducts(productsFromDb);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#2f3b66", mb: 1 }}>
        Products
      </Typography>

      <Typography variant="body1" sx={{ color: "#5f6b91", mb: 4 }}>
        All products from Firestore are shown here.
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(47,59,102,0.10)",
              }}
            >
              {product[PRODUCTS_FIELDS.IMG_URL] && (
                <CardMedia
                  component="img"
                  height="180"
                  image={product[PRODUCTS_FIELDS.IMG_URL]}
                  alt={product[PRODUCTS_FIELDS.NAME]}
                  sx={{ objectFit: "cover" }}
                />
              )}

              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#24304f" }}>
                  {product[PRODUCTS_FIELDS.NAME]}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {product[PRODUCTS_FIELDS.DESCRIPTION]}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: "auto" }}>
                  <Chip
                    label={`$${Number(product[PRODUCTS_FIELDS.PRICE] ?? 0).toLocaleString()}`}
                    sx={{
                      backgroundColor: "#eef1ff",
                      color: "#4254a8",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={`Stock: ${Number(product[PRODUCTS_FIELDS.STOCK_QTY] ?? 0)}`}
                    variant="outlined"
                    sx={{ borderColor: "#667eea", color: "#667eea" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomersProducts;

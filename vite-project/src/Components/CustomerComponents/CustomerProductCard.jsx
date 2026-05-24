import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { PRODUCTS_FIELDS } from "../../Constants/fields.js";

const CustomerProductCard = ({ product }) => {
  return (
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
  );
};

export default CustomerProductCard;

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PRODUCTS_FIELDS } from "../../Constants/fields.js";
import ProductImagePreview from "./ProductImagePreview.jsx";

const CustomerProductCard = ({
  product,
  selectedQty,
  onQuantityChange,
}) => {
  const stockQty = Number(product[PRODUCTS_FIELDS.STOCK_QTY] ?? 0);

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(47,59,102,0.10)",
        overflow: "hidden",
      }}
    >
      <ProductImagePreview
        imageUrl={product[PRODUCTS_FIELDS.IMG_URL]}
        alt={product[PRODUCTS_FIELDS.NAME]}
      />

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#24304f",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
          }}
        >
          {product[PRODUCTS_FIELDS.NAME]}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "4.5em",
          }}
        >
          {product[PRODUCTS_FIELDS.DESCRIPTION]}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #e6e9f7",
            borderRadius: 2,
            px: 1,
            py: 0.75,
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "#2f3b66" }}>
            Qty
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => onQuantityChange(product.id, -1, stockQty)}
              disabled={selectedQty === 0}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              sx={{
                minWidth: 20,
                textAlign: "center",
                fontWeight: 700,
                color: "#24304f",
              }}
            >
              {selectedQty}
            </Typography>

            <IconButton
              size="small"
              onClick={() => onQuantityChange(product.id, 1, stockQty)}
              disabled={selectedQty >= stockQty}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerProductCard;

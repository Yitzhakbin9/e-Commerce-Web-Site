import React from "react";
import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ProductsFilterBar = ({ searchTerm, onSearchChange }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#2f3b66", mb: 2 }}>
        Search Products
      </Typography>

      <TextField
        fullWidth
        label="Search by title"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#667eea" }} />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default ProductsFilterBar;

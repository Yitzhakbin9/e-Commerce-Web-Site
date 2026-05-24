import React from "react";
import { MenuItem, Paper, TextField, Typography } from "@mui/material";
import { CATEGORY_FIELDS } from "../../Constants/fields.js";

const ProductsCategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: "#2f3b66", mb: 2 }}
      >
        Filter By Category
      </Typography>

      <TextField
        select
        fullWidth
        label="Category"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <MenuItem value="all">All categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category[CATEGORY_FIELDS.NAME]}>
            {category[CATEGORY_FIELDS.NAME]}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  );
};

export default ProductsCategoryFilter;

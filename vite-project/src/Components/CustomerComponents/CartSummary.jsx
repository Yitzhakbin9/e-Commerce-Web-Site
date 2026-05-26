import React from "react";
import {
  Alert,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const CartSummary = ({ cartItems, cartTotal, totalSelectedUnits }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#2f3b66", mb: 1 }}>
        Your Cart
      </Typography>

      <Typography variant="body2" sx={{ color: "#5f6b91", mb: 3 }}>
        {totalSelectedUnits} selected unit{totalSelectedUnits === 1 ? "" : "s"}
      </Typography>

      {cartItems.length === 0 ? (
        <Alert severity="info">Choose quantities and they will appear here.</Alert>
      ) : (
        <Stack spacing={2}>
          {cartItems.map((item) => (
            <Paper
              key={item.id}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, color: "#24304f" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.quantity} x ${item.price.toLocaleString()}
                  </Typography>
                </Box>

                <Typography sx={{ fontWeight: 700, color: "#24304f" }}>
                  ${item.total.toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#2f3b66" }}>
          Total
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#24304f" }}>
          ${cartTotal.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartSummary;

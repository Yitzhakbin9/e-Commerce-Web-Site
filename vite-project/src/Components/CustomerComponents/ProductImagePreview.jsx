import React, { useState } from "react";
import {
  Box,
  CardMedia,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProductImagePreview = ({
  imageUrl,
  alt,
  aspectRatio = "4 / 3",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    if (!imageUrl) {
      return;
    }

    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          width: "100%",
          aspectRatio,
          overflow: "hidden",
          backgroundColor: "#f4f6fb",
          flexShrink: 0,
          position: "relative",
          cursor: imageUrl ? "zoom-in" : "default",
        }}
      >
        {imageUrl ? (
          <>
            <CardMedia
              component="img"
              image={imageUrl}
              alt={alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                right: 12,
                bottom: 12,
                px: 1,
                py: 0.5,
                borderRadius: 999,
                backgroundColor: "rgba(36, 48, 79, 0.72)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                pointerEvents: "none",
              }}
            >
              Click to preview
            </Box>
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8a94b2",
            }}
          >
            <Typography variant="body2">No image</Typography>
          </Box>
        )}
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#f4f6fb",
            },
          },
        }}
      >
        {imageUrl ? (
          <Box sx={{ position: "relative", backgroundColor: "#f4f6fb" }}>
            <IconButton
              aria-label="Close image preview"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#24304f",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              component="img"
              src={imageUrl}
              alt={alt}
              sx={{
                display: "block",
                width: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                backgroundColor: "#f4f6fb",
              }}
            />
          </Box>
        ) : null}
      </Dialog>
    </>
  );
};

export default ProductImagePreview;

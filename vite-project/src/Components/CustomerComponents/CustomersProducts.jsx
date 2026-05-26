import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import categoriesRepo from "../../Repos/categoriesRepo.js";
import ordersRepo from "../../Repos/ordersRepo.js";
import productsRepo from "../../Repos/productsRepo.js";
import usersRepo from "../../Repos/usersRepo.js";
import {
  CATEGORY_FIELDS,
  ORDER_PRODUCT_FIELDS,
  ORDERS_FIELDS,
  USER_FIELDS,
  PRODUCTS_FIELDS,
} from "../../Constants/fields.js";
import CartSummary from "./CartSummary.jsx";
import CustomerProductCard from "./CustomerProductCard.jsx";
import ProductsCategoryFilter from "./ProductsCategoryFilter.jsx";
import ProductsFilterBar from "./ProductsFilterBar.jsx";

const CustomersProducts = () => {
  const { uid } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  useEffect(() => {
    if (!uid) {
      return;
    }

    const loadUser = async () => {
      const userSnapshot = await usersRepo.getUserById(uid);

      if (userSnapshot.exists()) {
        setCurrentUser(userSnapshot.data());
      }
    };

    loadUser();
  }, [uid]);

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

  const cartItems = products
    .filter((product) => Number(selectedQuantities[product.id] ?? 0) > 0)
    .map((product) => {
      const quantity = Number(selectedQuantities[product.id] ?? 0);
      const price = Number(product[PRODUCTS_FIELDS.PRICE] ?? 0);

      return {
        id: product.id,
        name: product[PRODUCTS_FIELDS.NAME],
        quantity,
        price,
        total: quantity * price,
      };
    });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const totalSelectedUnits = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const updateProductQuantity = (productId, delta, stockQty) => {
    setOrderError("");
    setOrderSuccess(false);

    setSelectedQuantities((currentQuantities) => {
      const currentQuantity = Number(currentQuantities[productId] ?? 0);
      const nextQuantity = Math.max(
        0,
        Math.min(stockQty, currentQuantity + delta),
      );

      return {
        ...currentQuantities,
        [productId]: nextQuantity,
      };
    });
  };

  const handleClearAll = () => {
    setSelectedQuantities({});
    setOrderError("");
    setOrderSuccess(false);
  };

  const handleOrder = async () => {
    if (cartItems.length === 0 || isOrdering) {
      return;
    }

    setIsOrdering(true);
    setOrderError("");
    setOrderSuccess(false);

    const userName =
      currentUser?.[USER_FIELDS.USER_NAME] ||
      [currentUser?.[USER_FIELDS.FIRST_NAME], currentUser?.[USER_FIELDS.LAST_NAME]]
        .filter(Boolean)
        .join(" ") ||
      uid;

    const orderProducts = cartItems.map((item) => ({
      [ORDER_PRODUCT_FIELDS.PRODUCT_ID]: item.id,
      [ORDER_PRODUCT_FIELDS.NAME]: item.name,
      [ORDER_PRODUCT_FIELDS.UNIT_PRICE]: item.price,
      [ORDER_PRODUCT_FIELDS.QUANTITY]: item.quantity,
    }));

    try {
      await ordersRepo.addOrder({
        [ORDERS_FIELDS.USER_ID]: uid,
        [ORDERS_FIELDS.USER_NAME]: userName,
        [ORDERS_FIELDS.STATUS]: "pending",
        [ORDERS_FIELDS.TOTAL_PRICE]: cartTotal,
        [ORDERS_FIELDS.CREATED_AT]: new Date(),
        [ORDERS_FIELDS.PRODUCTS]: orderProducts,
      });

      setSelectedQuantities({});
      setOrderSuccess(true);
    } catch (error) {
      console.error("Failed to save order:", error);
      setOrderError("Could not save the order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "320px minmax(0, 1fr)",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Box>
          <CartSummary
            cartItems={cartItems}
            cartTotal={cartTotal}
            totalSelectedUnits={totalSelectedUnits}
            onOrder={handleOrder}
            onClearAll={handleClearAll}
            isOrdering={isOrdering}
            orderError={orderError}
            orderSuccess={orderSuccess}
          />
        </Box>

        <Box>
          <Grid container spacing={3} alignItems="stretch">
            {filteredProducts.map((product) => (
              <Grid
                key={product.id}
                size={{ xs: 12, sm: 6, lg: 4 }}
                sx={{ display: "flex" }}
              >
                <CustomerProductCard
                  product={product}
                  selectedQty={Number(selectedQuantities[product.id] ?? 0)}
                  onQuantityChange={updateProductQuantity}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomersProducts;

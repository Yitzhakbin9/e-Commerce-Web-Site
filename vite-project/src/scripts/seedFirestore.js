import {
  doc,
  writeBatch,
  Timestamp
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase.seed.js";
import { COLLECTIONS } from "../Constants/collections.js";
import {
  USER_FIELDS,
  CATEGORY_FIELDS,
  PRODUCTS_FIELDS,
  ORDERS_FIELDS,
  ORDER_PRODUCT_FIELDS
} from "../Constants/fields.js";

const CART_COLLECTION_NAME = "cart";

const createTimestamp = (dateString) => Timestamp.fromDate(new Date(dateString));

const getOptionalEnv = (primaryKey, fallbackKey) =>
  process.env[primaryKey] ?? process.env[fallbackKey] ?? "";

const seedEmail = getOptionalEnv("FIREBASE_SEED_EMAIL", "VITE_FIREBASE_SEED_EMAIL");
const seedPassword = getOptionalEnv(
  "FIREBASE_SEED_PASSWORD",
  "VITE_FIREBASE_SEED_PASSWORD"
);

const users = [
  {
    id: "seed-user-1",
    [USER_FIELDS.EMAIL]: "noa@example.com",
    [USER_FIELDS.ROLE]: "user",
    [USER_FIELDS.CREATED_AT]: createTimestamp("2026-01-10T09:00:00Z"),
    [USER_FIELDS.FIRST_NAME]: "Noa",
    [USER_FIELDS.LAST_NAME]: "Levi",
    [USER_FIELDS.USER_NAME]: "noalevi",
  },
  {
    id: "seed-user-2",
    [USER_FIELDS.EMAIL]: "omer@example.com",
    [USER_FIELDS.ROLE]: "user",
    [USER_FIELDS.CREATED_AT]: createTimestamp("2026-01-18T11:30:00Z"),
    [USER_FIELDS.FIRST_NAME]: "Omer",
    [USER_FIELDS.LAST_NAME]: "Cohen",
    [USER_FIELDS.USER_NAME]: "omercohen",
  },
  {
    id: "seed-admin-1",
    [USER_FIELDS.EMAIL]: "admin@example.com",
    [USER_FIELDS.ROLE]: "admin",
    [USER_FIELDS.CREATED_AT]: createTimestamp("2026-01-01T08:00:00Z"),
    [USER_FIELDS.FIRST_NAME]: "Site",
    [USER_FIELDS.LAST_NAME]: "Admin",
    [USER_FIELDS.USER_NAME]: "siteadmin",
  },
];

const categories = [
  {
    id: "electronics",
    [CATEGORY_FIELDS.NAME]: "Electronics",
    [CATEGORY_FIELDS.IS_ACTIVE]: true,
    [CATEGORY_FIELDS.CREATED_AT]: createTimestamp("2026-01-02T08:00:00Z"),
  },
  {
    id: "books",
    [CATEGORY_FIELDS.NAME]: "Books",
    [CATEGORY_FIELDS.IS_ACTIVE]: true,
    [CATEGORY_FIELDS.CREATED_AT]: createTimestamp("2026-01-02T08:05:00Z"),
  },
  {
    id: "home-office",
    [CATEGORY_FIELDS.NAME]: "Home Office",
    [CATEGORY_FIELDS.IS_ACTIVE]: true,
    [CATEGORY_FIELDS.CREATED_AT]: createTimestamp("2026-01-02T08:10:00Z"),
  },
];

const products = [
  {
    id: "laptop-pro-14",
    [PRODUCTS_FIELDS.NAME]: "Laptop Pro 14",
    [PRODUCTS_FIELDS.DESCRIPTION]: "Powerful laptop for developers and creators",
    [PRODUCTS_FIELDS.PRICE]: 6800,
    [PRODUCTS_FIELDS.IMG_URL]:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    [PRODUCTS_FIELDS.STOCK_QTY]: 15,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CATEGORY_NAME]: "Electronics",
    [PRODUCTS_FIELDS.CREATED_AT]: createTimestamp("2026-01-03T09:00:00Z"),
  },
  {
    id: "wireless-headphones",
    [PRODUCTS_FIELDS.NAME]: "Wireless Headphones",
    [PRODUCTS_FIELDS.DESCRIPTION]: "Noise cancelling over-ear headphones",
    [PRODUCTS_FIELDS.PRICE]: 1200,
    [PRODUCTS_FIELDS.IMG_URL]:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    [PRODUCTS_FIELDS.STOCK_QTY]: 40,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CATEGORY_NAME]: "Electronics",
    [PRODUCTS_FIELDS.CREATED_AT]: createTimestamp("2026-01-03T09:15:00Z"),
  },
  {
    id: "react-complete-guide",
    [PRODUCTS_FIELDS.NAME]: "React Complete Guide",
    [PRODUCTS_FIELDS.DESCRIPTION]: "A practical book for modern React development",
    [PRODUCTS_FIELDS.PRICE]: 180,
    [PRODUCTS_FIELDS.IMG_URL]:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    [PRODUCTS_FIELDS.STOCK_QTY]: 60,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CATEGORY_NAME]: "Books",
    [PRODUCTS_FIELDS.CREATED_AT]: createTimestamp("2026-01-03T09:30:00Z"),
  },
  {
    id: "espresso-machine",
    [PRODUCTS_FIELDS.NAME]: "Espresso Machine",
    [PRODUCTS_FIELDS.DESCRIPTION]: "Compact espresso machine for home use",
    [PRODUCTS_FIELDS.PRICE]: 950,
    [PRODUCTS_FIELDS.IMG_URL]:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=900&q=80",
    [PRODUCTS_FIELDS.STOCK_QTY]: 20,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CATEGORY_NAME]: "Home Office",
    [PRODUCTS_FIELDS.CREATED_AT]: createTimestamp("2026-01-03T09:45:00Z"),
  },
];

const createOrderItem = (productId, name, unitPrice, quantity) => ({
  [ORDER_PRODUCT_FIELDS.PRODUCT_ID]: productId,
  [ORDER_PRODUCT_FIELDS.NAME]: name,
  [ORDER_PRODUCT_FIELDS.UNIT_PRICE]: unitPrice,
  [ORDER_PRODUCT_FIELDS.QUANTITY]: quantity,
});

const userCarts = [
  {
    userId: "seed-user-1",
    items: [
      {
        id: "cart-wireless-headphones",
        [ORDER_PRODUCT_FIELDS.PRODUCT_ID]: "wireless-headphones",
        [ORDER_PRODUCT_FIELDS.NAME]: "Wireless Headphones",
        [ORDER_PRODUCT_FIELDS.UNIT_PRICE]: 1200,
        [ORDER_PRODUCT_FIELDS.QUANTITY]: 1,
        [PRODUCTS_FIELDS.IMG_URL]:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
        addedAt: createTimestamp("2026-02-05T11:00:00Z"),
      },
    ],
  },
  {
    userId: "seed-user-2",
    items: [
      {
        id: "cart-react-book",
        [ORDER_PRODUCT_FIELDS.PRODUCT_ID]: "react-complete-guide",
        [ORDER_PRODUCT_FIELDS.NAME]: "React Complete Guide",
        [ORDER_PRODUCT_FIELDS.UNIT_PRICE]: 180,
        [ORDER_PRODUCT_FIELDS.QUANTITY]: 2,
        [PRODUCTS_FIELDS.IMG_URL]:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
        addedAt: createTimestamp("2026-02-06T14:20:00Z"),
      },
    ],
  },
];

const orderItems1 = [
  createOrderItem("laptop-pro-14", "Laptop Pro 14", 6800, 1),
  createOrderItem("wireless-headphones", "Wireless Headphones", 1200, 1),
];

const orderItems2 = [
  createOrderItem("react-complete-guide", "React Complete Guide", 180, 1),
  createOrderItem("espresso-machine", "Espresso Machine", 950, 1),
];

const calculateOrderTotal = (items) =>
  items.reduce(
    (sum, item) =>
      sum +
      item[ORDER_PRODUCT_FIELDS.UNIT_PRICE] * item[ORDER_PRODUCT_FIELDS.QUANTITY],
    0
  );

const orders = [
  {
    id: "order-1001",
    [ORDERS_FIELDS.USER_ID]: "seed-user-1",
    [ORDERS_FIELDS.USER_NAME]: "Noa Levi",
    [ORDERS_FIELDS.STATUS]: "completed",
    [ORDERS_FIELDS.TOTAL_PRICE]: calculateOrderTotal(orderItems1),
    [ORDERS_FIELDS.CREATED_AT]: createTimestamp("2026-02-01T10:00:00Z"),
    [ORDERS_FIELDS.PRODUCTS]: orderItems1,
  },
  {
    id: "order-1002",
    [ORDERS_FIELDS.USER_ID]: "seed-user-2",
    [ORDERS_FIELDS.USER_NAME]: "Omer Cohen",
    [ORDERS_FIELDS.STATUS]: "completed",
    [ORDERS_FIELDS.TOTAL_PRICE]: calculateOrderTotal(orderItems2),
    [ORDERS_FIELDS.CREATED_AT]: createTimestamp("2026-02-03T16:30:00Z"),
    [ORDERS_FIELDS.PRODUCTS]: orderItems2,
  },
];

const addCollectionDocsToBatch = (batch, collectionName, docs) => {
  docs.forEach(({ id, ...data }) => {
    batch.set(doc(db, collectionName, id), data);
  });
};

const addCartDocsToBatch = (batch, carts) => {
  carts.forEach(({ userId, items }) => {
    items.forEach(({ id, ...data }) => {
      batch.set(
        doc(db, COLLECTIONS.USERS, userId, CART_COLLECTION_NAME, id),
        data
      );
    });
  });
};

async function seedFirestore() {
  let signedInUser = null;

  if (seedEmail && seedPassword) {
    const credentials = await signInWithEmailAndPassword(
      auth,
      seedEmail,
      seedPassword
    );
    signedInUser = credentials.user;
    console.log(`Signed in as ${signedInUser.email}`);
  } else {
    console.warn(
      "Running seed without Firebase Auth sign-in. If your Firestore rules require authentication or admin role, add FIREBASE_SEED_EMAIL and FIREBASE_SEED_PASSWORD to .env."
    );
  }

  const batch = writeBatch(db);

  addCollectionDocsToBatch(batch, COLLECTIONS.USERS, users);
  addCollectionDocsToBatch(batch, COLLECTIONS.CATEGORIES, categories);
  addCollectionDocsToBatch(batch, COLLECTIONS.PRODUCTS, products);
  addCollectionDocsToBatch(batch, COLLECTIONS.ORDERS, orders);
  addCartDocsToBatch(batch, userCarts);

  await batch.commit();

  console.log("Firestore seed completed successfully.");
  console.log(`users: ${users.length}`);
  console.log(`categories: ${categories.length}`);
  console.log(`products: ${products.length}`);
  console.log(`orders: ${orders.length}`);
  console.log(
    `cart items: ${userCarts.reduce((sum, cart) => sum + cart.items.length, 0)}`
  );
  console.log(
    "Note: seeded user documents do not create Firebase Auth accounts automatically."
  );

  if (signedInUser) {
    await signOut(auth);
  }
}

seedFirestore().catch((error) => {
  console.error("Firestore seed failed:", error);
  process.exitCode = 1;
});

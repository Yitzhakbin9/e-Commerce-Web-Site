import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  Timestamp
} from "firebase/firestore";
import { COLLECTIONS } from '../Constants/collections.js';
import { USER_FIELDS, CATEGORY_FIELDS, PRODUCTS_FIELDS, ORDERS_FIELDS } from '../Constants/fields.js';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= USERS ================= */

const users = [
  {
    [USER_FIELDS.ID]: "u1",
    [USER_FIELDS.NAME]: "Yoni Cohen",
    [USER_FIELDS.EMAIL]: "yoni@gmail.com",
    [USER_FIELDS.ROLE]: "user",
    allowOthersSeeOrders: true,
    [USER_FIELDS.CREATED_AT]: Timestamp.now(),
  },
  {
    [USER_FIELDS.ID]: "u2",
    [USER_FIELDS.NAME]: "Dana Levi",
    [USER_FIELDS.EMAIL]: "dana@gmail.com",
    [USER_FIELDS.ROLE]: "user",
    allowOthersSeeOrders: false,
    [USER_FIELDS.CREATED_AT]: Timestamp.now(),
  },
  {
    [USER_FIELDS.ID]: "admin1",
    [USER_FIELDS.NAME]: "Admin User",
    [USER_FIELDS.EMAIL]: "admin@gmail.com",
    [USER_FIELDS.ROLE]: "admin",
    allowOthersSeeOrders: false,
    [USER_FIELDS.CREATED_AT]: Timestamp.now(),
  },
];

/* ================= CATEGORIES ================= */

const categories = [
  { [USER_FIELDS.ID]: "c1", [CATEGORY_FIELDS.NAME]: "Electronics", [CATEGORY_FIELDS.IS_ACTIVE]: true, [CATEGORY_FIELDS.CREATED_AT]: Timestamp.now() },
  { [USER_FIELDS.ID]: "c2", [CATEGORY_FIELDS.NAME]: "Books", [CATEGORY_FIELDS.IS_ACTIVE]: true, [CATEGORY_FIELDS.CREATED_AT]: Timestamp.now() },
  { [USER_FIELDS.ID]: "c3", [CATEGORY_FIELDS.NAME]: "Home", [CATEGORY_FIELDS.IS_ACTIVE]: true, [CATEGORY_FIELDS.CREATED_AT]: Timestamp.now() },
];

/* ================= PRODUCTS ================= */

const products = [
  {
    [USER_FIELDS.ID]: "p1",
    [PRODUCTS_FIELDS.NAME]: "Laptop Pro 14",
    [PRODUCTS_FIELDS.DESCREPTION]: "Powerful laptop for developers",
    [PRODUCTS_FIELDS.PRICE]: 6800,
    categoryId: "c1",
    [PRODUCTS_FIELDS.IMG_URL]: "",
    [PRODUCTS_FIELDS.STOCO_QTY]: 15,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CREATED_AT]: Timestamp.now(),
  },
  {
    [USER_FIELDS.ID]: "p2",
    [PRODUCTS_FIELDS.NAME]: "Wireless Headphones",
    [PRODUCTS_FIELDS.DESCREPTION]: "Noise cancelling headphones",
    [PRODUCTS_FIELDS.PRICE]: 1200,
    categoryId: "c1",
    [PRODUCTS_FIELDS.IMG_URL]: "",
    [PRODUCTS_FIELDS.STOCO_QTY]: 40,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CREATED_AT]: Timestamp.now(),
  },
  {
    [USER_FIELDS.ID]: "p3",
    [PRODUCTS_FIELDS.NAME]: "React Complete Guide",
    [PRODUCTS_FIELDS.DESCREPTION]: "Learn React from zero to hero",
    [PRODUCTS_FIELDS.PRICE]: 180,
    categoryId: "c2",
    [PRODUCTS_FIELDS.IMG_URL]: "",
    [PRODUCTS_FIELDS.STOCO_QTY]: 60,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CREATED_AT]: Timestamp.now(),
  },
  {
    [USER_FIELDS.ID]: "p4",
    [PRODUCTS_FIELDS.NAME]: "Coffee Machine",
    [PRODUCTS_FIELDS.DESCREPTION]: "Espresso machine for home",
    [PRODUCTS_FIELDS.PRICE]: 950,
    categoryId: "c3",
    [PRODUCTS_FIELDS.IMG_URL]: "",
    [PRODUCTS_FIELDS.STOCO_QTY]: 20,
    [PRODUCTS_FIELDS.IS_ACTIVE]: true,
    [PRODUCTS_FIELDS.CREATED_AT]: Timestamp.now(),
  },
];

/* ================= ORDERS ================= */

const orders = [
  {
    [USER_FIELDS.ID]: "o1",
    [ORDERS_FIELDS.USER_ID]: "u1",
    [ORDERS_FIELDS.USER_NAME]: "Yoni Cohen",
    [ORDERS_FIELDS.STATUS]: "completed",
    [ORDERS_FIELDS.TOTAL_PRICE]: 8000,
    [ORDERS_FIELDS.CREATED_AT]: Timestamp.now(),
    [ORDERS_FIELDS.PRODUCTS]: [
      {
        productId: "p1",
        [PRODUCTS_FIELDS.NAME]: "Laptop Pro 14",
        [PRODUCTS_FIELDS.PRICE]: 6800,
        quantity: 1,
      },
      {
        productId: "p2",
        [PRODUCTS_FIELDS.NAME]: "Wireless Headphones",
        [PRODUCTS_FIELDS.PRICE]: 1200,
        quantity: 1,
      },
    ],
  },
  {
    [USER_FIELDS.ID]: "o2",
    [ORDERS_FIELDS.USER_ID]: "u2",
    [ORDERS_FIELDS.USER_NAME]: "Dana Levi",
    [ORDERS_FIELDS.STATUS]: "completed",
    [ORDERS_FIELDS.TOTAL_PRICE]: 1130,
    [ORDERS_FIELDS.CREATED_AT]: Timestamp.now(),
    [ORDERS_FIELDS.PRODUCTS]: [
      {
        productId: "p3",
        [PRODUCTS_FIELDS.NAME]: "React Complete Guide",
        [PRODUCTS_FIELDS.PRICE]: 180,
        quantity: 1,
      },
      {
        productId: "p4",
        [PRODUCTS_FIELDS.NAME]: "Coffee Machine",
        [PRODUCTS_FIELDS.PRICE]: 950,
        quantity: 1,
      },
    ],
  },
];

/* ================= SEED ================= */

async function seed() {
  for (const u of users) {
    await setDoc(doc(db, COLLECTIONS.USERS, u[USER_FIELDS.ID]), u);
  }

  for (const c of categories) {
    await setDoc(doc(db, COLLECTIONS.CATEGORIES, c[USER_FIELDS.ID]), c);
  }

  for (const p of products) {
    await setDoc(doc(db, COLLECTIONS.PRODUCTS, p[USER_FIELDS.ID]), p);
  }

  for (const o of orders) {
    await setDoc(doc(db, COLLECTIONS.ORDERS, o[USER_FIELDS.ID]), o);
  }

  console.log("Full realistic seed completed");
}

seed();
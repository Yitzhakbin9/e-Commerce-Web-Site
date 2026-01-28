import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  Timestamp
} from "firebase/firestore";

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
    id: "u1",
    fullName: "Yoni Cohen",
    email: "yoni@gmail.com",
    role: "user",
    allowOthersSeeOrders: true,
    createdAt: Timestamp.now(),
  },
  {
    id: "u2",
    fullName: "Dana Levi",
    email: "dana@gmail.com",
    role: "user",
    allowOthersSeeOrders: false,
    createdAt: Timestamp.now(),
  },
  {
    id: "admin1",
    fullName: "Admin User",
    email: "admin@gmail.com",
    role: "admin",
    allowOthersSeeOrders: false,
    createdAt: Timestamp.now(),
  },
];

/* ================= CATEGORIES ================= */

const categories = [
  { id: "c1", name: "Electronics", isActive: true, createdAt: Timestamp.now() },
  { id: "c2", name: "Books", isActive: true, createdAt: Timestamp.now() },
  { id: "c3", name: "Home", isActive: true, createdAt: Timestamp.now() },
];

/* ================= PRODUCTS ================= */

const products = [
  {
    id: "p1",
    name: "Laptop Pro 14",
    description: "Powerful laptop for developers",
    price: 6800,
    categoryId: "c1",
    imageUrl: "",
    stockQty: 15,
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: "p2",
    name: "Wireless Headphones",
    description: "Noise cancelling headphones",
    price: 1200,
    categoryId: "c1",
    imageUrl: "",
    stockQty: 40,
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: "p3",
    name: "React Complete Guide",
    description: "Learn React from zero to hero",
    price: 180,
    categoryId: "c2",
    imageUrl: "",
    stockQty: 60,
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: "p4",
    name: "Coffee Machine",
    description: "Espresso machine for home",
    price: 950,
    categoryId: "c3",
    imageUrl: "",
    stockQty: 20,
    isActive: true,
    createdAt: Timestamp.now(),
  },
];

/* ================= ORDERS ================= */

const orders = [
  {
    id: "o1",
    userId: "u1",
    userName: "Yoni Cohen",
    status: "completed",
    totalPrice: 8000,
    createdAt: Timestamp.now(),
    products: [
      {
        productId: "p1",
        name: "Laptop Pro 14",
        price: 6800,
        quantity: 1,
      },
      {
        productId: "p2",
        name: "Wireless Headphones",
        price: 1200,
        quantity: 1,
      },
    ],
  },
  {
    id: "o2",
    userId: "u2",
    userName: "Dana Levi",
    status: "completed",
    totalPrice: 1130,
    createdAt: Timestamp.now(),
    products: [
      {
        productId: "p3",
        name: "React Complete Guide",
        price: 180,
        quantity: 1,
      },
      {
        productId: "p4",
        name: "Coffee Machine",
        price: 950,
        quantity: 1,
      },
    ],
  },
];

/* ================= SEED ================= */

async function seed() {
  for (const u of users) {
    await setDoc(doc(db, "users", u.id), u);
  }

  for (const c of categories) {
    await setDoc(doc(db, "categories", c.id), c);
  }

  for (const p of products) {
    await setDoc(doc(db, "products", p.id), p);
  }

  for (const o of orders) {
    await setDoc(doc(db, "orders", o.id), o);
  }

  console.log("Full realistic seed completed");
}

seed();
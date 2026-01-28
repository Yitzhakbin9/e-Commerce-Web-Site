// seedFirestore.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  Timestamp
} from "firebase/firestore";

// Firebase config (שים את שלך)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- USERS ----------
const users = [
  {
    id: "user1",
    fullName: "John Doe",
    email: "john@gmail.com",
    role: "user",
    allowOthersSeeOrders: true,
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

// ---------- CATEGORIES ----------
const categories = [
  {
    id: "cat1",
    name: "Electronics",
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: "cat2",
    name: "Books",
    isActive: true,
    createdAt: Timestamp.now(),
  },
];

// ---------- PRODUCTS ----------
const products = [
  {
    id: "prod1",
    name: "Laptop",
    description: "Gaming laptop",
    price: 5000,
    categoryId: "cat1",
    imageUrl: "",
    stockQty: 10,
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: "prod2",
    name: "React Book",
    description: "Learn React",
    price: 150,
    categoryId: "cat2",
    imageUrl: "",
    stockQty: 30,
    isActive: true,
    createdAt: Timestamp.now(),
  },
];

// ---------- ORDERS ----------
const orders = [
  {
    id: "order1",
    userId: "user1",
    userName: "John Doe",
    status: "completed",
    totalPrice: 5150,
    createdAt: Timestamp.now(),
    products: [
      {
        productId: "prod1",
        name: "Laptop",
        price: 5000,
        quantity: 1,
      },
      {
        productId: "prod2",
        name: "React Book",
        price: 150,
        quantity: 1,
      },
    ],
  },
];

// ---------- SEED FUNCTION ----------
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

  console.log("Seed completed");
}

seed();
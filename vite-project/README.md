# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Firestore Seed

The project includes a Firestore seed script at `src/scripts/seedFirestore.js`.

It writes sample data for:

- `users/{userId}`
- `users/{userId}/cart`
- `orders/{orderId}`
- `products/{productId}`
- `categories/{categoryId}`

Run it from the `vite-project` folder with:

```bash
npm run seed:firestore
```

The script reads Firebase env vars from `.env` and supports both:

- `VITE_FIREBASE_*`
- `FIREBASE_*`

If your Firestore rules allow writes only for authenticated/admin users, also add:

- `FIREBASE_SEED_EMAIL`
- `FIREBASE_SEED_PASSWORD`

Important:

- The seed creates Firestore user documents only.
- It does not create Firebase Authentication users automatically.

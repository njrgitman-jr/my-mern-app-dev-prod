//code 3
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

// Detect if production
const isProduction = process.env.NODE_ENV === "production";

/**
 * ALLOWED ORIGINS FOR PRODUCTION
 * You can add Vercel, Render and custom domains here.
 */
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,       // Vercel frontend
  /^https:\/\/.*\.onrender\.com$/,     // Render frontend
  /^https:\/\/yourdomain\.com$/,       // Optional custom domain
];

/**
 * CORS SETUP
 * → Allows all localhost in dev
 * → Allows Vercel, Render, etc. in production
 * → NO NETWORK ERROR
 */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or Postman
      if (!origin) return callback(null, true);

      // Allow everything in development
      if (!isProduction) return callback(null, true);

      // Check allowed origins in production
      const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));

      return isAllowed
        ? callback(null, true)
        : callback(new Error(`❌ CORS blocked for: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Root test route
app.get("/", (req, res) => res.send("🚀 Update-Plan API is running"));

// API routes
app.use("/api/products", productRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "test" })
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✔ Server running on PORT ${PORT}`));

export default app;



//code 2

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import productRoutes from "./routes/product.routes.js";

// dotenv.config();

// const app = express();

// // Detect if production
// const isProduction = process.env.NODE_ENV === "production";

// /**
//  * ALLOWED ORIGINS FOR PRODUCTION
//  * You can add Vercel, Render and custom domains here.
//  */
// const allowedOrigins = [
//   /^https:\/\/.*\.vercel\.app$/,       // Vercel frontend
//   /^https:\/\/.*\.onrender\.com$/,     // Render frontend
//   /^https:\/\/yourdomain\.com$/,       // Optional custom domain
// ];

// /**
//  * CORS SETUP
//  * → Allows all localhost in dev
//  * → Allows Vercel, Render, etc. in production
//  * → NO NETWORK ERROR
//  */
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow server-to-server or Postman
//       if (!origin) return callback(null, true);

//       // Allow everything in development
//       if (!isProduction) return callback(null, true);

//       // Check allowed origins in production
//       const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));

//       return isAllowed
//         ? callback(null, true)
//         : callback(new Error(`❌ CORS blocked for: ${origin}`));
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Root test route
// app.get("/", (req, res) => res.send("🚀 Update-Plan API is running"));

// // API routes
// app.use("/api/products", productRoutes);

// // MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, { dbName: "test" })
//   .then(() => console.log("✔ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`✔ Server running on PORT ${PORT}`));

// export default app;




//code 1 work both******************************************************** */

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import productRoutes from "./routes/product.routes.js";

// dotenv.config();

// const app = express();

// const isProduction = process.env.NODE_ENV === "production";

// app.use(
//   cors({
//     origin: isProduction
//       ? [/^https:\/\/.*\.vercel\.app$/]
//       : true,
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Test route
// app.get("/", (req, res) => res.send("🚀 Update-Plan API is running"));

// // Routes
// app.use("/api/products", productRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGODB_URI, { dbName: "test" })
//   .then(() => console.log("✔ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Start server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`✔ Server running on PORT ${PORT}`));

// export default app;




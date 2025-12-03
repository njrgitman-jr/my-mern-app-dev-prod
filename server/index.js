import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

// Allowed origins
const allowedOrigins = isProduction
  ? [
      // Add your production frontend domain(s) here
      /^https:\/\/.*\.vercel\.app$/,   // Example for Vercel
      /^https:\/\/your-frontend-domain\.com$/ // Add more if needed
    ]
  : [/^http:\/\/localhost:\d+$/]; // Local dev

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, server-to-server)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed
      const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));
      if (isAllowed) callback(null, true);
      else callback(new Error("❌ Not allowed by CORS"));
    },
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("🚀 Update-Plan API is running"));

// Routes
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "test" })
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✔ Server running on PORT ${PORT}`));

export default app;



















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




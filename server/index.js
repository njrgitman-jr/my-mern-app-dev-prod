import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

// CORS configuration
const allowedOrigins = isProduction
  ? [/^https:\/\/.*\.vercel\.app$/] // Only allow your frontend in production
  : [/^http:\/\/localhost:\d+$/];   // Local dev

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman or backend requests

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

// API routes
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "test" })
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Start server
// ✅ Use Render-provided PORT, fallback to 8080 for local development
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✔ Server running on PORT ${PORT}`));

export default app;

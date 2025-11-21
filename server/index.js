// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js"; // <-- add this
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

// CORS — allow only FRONTEND_URL from env
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({ origin: FRONTEND }));

// Connect to MongoDB
const MONGO = process.env.MONGODB_URI;
connectDB(MONGO);

// Routes
app.use("/api/products", productRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

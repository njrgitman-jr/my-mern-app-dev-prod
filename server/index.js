import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((pattern) => pattern.test(origin));
      if (isAllowed) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => res.send("🚀 Update-Plan API is running"));

// Routes
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "test" })
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Local server for development
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 8080, () =>
    console.log(
      `✔ Local server running → http://localhost:${process.env.PORT || 8080}`
    )
  );
}

export default app;

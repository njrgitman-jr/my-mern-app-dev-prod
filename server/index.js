import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
const app = express();

// --------------------------------------------------
// ⭐ UNIVERSAL CORS CONFIG (LOCAL + ALL VERCEL)
// --------------------------------------------------
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,   // all vercel preview + prod
  /^http:\/\/localhost:\d+$/       // local dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌍 Incoming request from:", origin);

      if (!origin) return callback(null, true); // Postman/mobile

      const isAllowed = allowedOrigins.some((pattern) =>
        pattern.test(origin)
      );

      if (isAllowed) callback(null, true);
      else callback(new Error("❌ Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("🚀 Update-Plan API is running");
});

// --------------------------------------------------
// ⭐ ROUTES (MOUNT ONLY ONCE!)
// --------------------------------------------------
app.use("/api/products", productRoutes);

// --------------------------------------------------
// ⭐ MONGODB
// --------------------------------------------------
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "test" })
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// --------------------------------------------------
// ⭐ LOCAL DEV ONLY
// --------------------------------------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () =>
    console.log(`✔ Local server running → http://localhost:${PORT}`)
  );
}

// --------------------------------------------------
// ⭐ EXPORT FOR VERCEL
// --------------------------------------------------
export default app;

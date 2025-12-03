import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js"; // <-- add this

dotenv.config();

const app = express();

// --------------------------
// ⭐ FLEXIBLE CORS CONFIG (LOCAL + VERCEL PRODUCTION + PREVIEW)
// --------------------------
//test
// --------------------------
// ⭐ UNIVERSAL CORS CONFIG (LOCAL + DEV VERCEL + PROD VERCEL)
// --------------------------
// -------------------------------
// ⭐ UNIVERSAL CORS CONFIG
// -------------------------------
const allowedOrigins = [
  /^https:\/\/.*\.vercel\.app$/,  // All Vercel previews + production
  /^http:\/\/localhost:\d+$/      // Local dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("🌍 Incoming request from:", origin);

      if (!origin) return callback(null, true); // Postman, mobile apps

      const isAllowed = allowedOrigins.some(pattern => pattern.test(origin));

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("❌ CORS BLOCKED:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// JSON parser
app.use(express.json());
// --------------------------
// ⭐ BASIC TEST ROUTE
// --------------------------
app.get("/", (req, res) => {
  res.send("🚀 Update-Plan API is running");
});

// --------------------------
// ⭐ ROUTES
// --------------------------
app.use("/api", productRoutes);

// --------------------------
// ⭐ MONGODB CONNECTION
// --------------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "test",
  })
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/products", productRoutes);


// --------------------------
// ⭐ LOCAL SERVER (ONLY IN DEV)
// --------------------------
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 8080, () =>
    console.log(
      `✔ Local server running → http://localhost:${process.env.PORT || 8080}`
    )
  );
}

// --------------------------
// ⭐ EXPORT FOR VERCEL
// --------------------------
export default app;




// // server/index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import productRoutes from "./routes/product.routes.js"; // <-- add this
// import path from "path";

// dotenv.config();

// const app = express();
// app.use(express.json());

// // CORS — allow only FRONTEND_URL from env
// const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
// app.use(cors({ origin: FRONTEND }));

// // Connect to MongoDB
// const MONGO = process.env.MONGODB_URI;
// connectDB(MONGO);

// // Routes
// app.use("/api/products", productRoutes);



// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

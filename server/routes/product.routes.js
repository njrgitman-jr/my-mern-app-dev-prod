// server/src/routes/product.routes.js
import express from "express";
import { getFirstProduct } from "../controllers/product.controller.js";

const router = express.Router();

// GET first product (first row by createdAt ascending)
router.get("/first", getFirstProduct);

// You can keep other product endpoints here too, e.g.:
// router.post("/", createProduct);
// router.get("/", listProducts);

export default router;

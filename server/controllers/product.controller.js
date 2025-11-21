    // server/src/controllers/product.controller.js
import ProductModel from "../models/product.model.js";

/**
 * Get the first product in the collection (by createdAt ascending).
 * - If found: returns 200 + product JSON
 * - If none: returns 404
 */
export const getFirstProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne().sort({ createdAt: 1 }).lean();
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.json(product);
  } catch (err) {
    console.error("getFirstProduct error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

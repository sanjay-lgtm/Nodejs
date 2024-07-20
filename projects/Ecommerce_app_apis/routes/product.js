import express from "express";
import { createProduct, deleteProduct, editProduct, listProducts } from "../controller/product.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/list", authMiddleware, listProducts);

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  createProduct
);

router.post(
  "/edit/:productId",
  authMiddleware,
  roleMiddleware(["SELLER"]),
  editProduct
);

router.delete(
  "/delete/:productId",
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  deleteProduct
);


export default router;
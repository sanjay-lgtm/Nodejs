import express from "express";
import { addToWishList, getWishList, removeToWishList } from "../controller/wishlist.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',authMiddleware,getWishList);
router.post('/add',authMiddleware,addToWishList);
router.delete('/remove',authMiddleware,removeToWishList);


export default router;
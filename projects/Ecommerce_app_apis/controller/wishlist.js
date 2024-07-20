import { User } from "../model/user.js"

export const addToWishList = async (req, res) => {
    //Todo:write your code to validate if req.body.productId belongs to products collection
    await User.findByIdAndUpdate(req.user._id, {
        $push: { wishlist: req.body.productId },
    })
    res.json({
        success: true,
        message: "Product added to wishlist",
    })
}

export const removeToWishList = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.body.productId },
    })
    res.json({
        success: true,
        message: "Product remove to wishlist"
    })
}

export const getWishList = async(req,res) =>{
    const wishlist = await User.findById(req.user._id)
    .populate('wishlist')
    .select('wishlist');
    console.log(wishlist)
    res.json({
        success: true,
        message:"Get wishlist"
    })
}
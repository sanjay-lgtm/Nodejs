import { Order } from "../model/order.js";
import { Product } from "../model/product.js";

export const placeOrder = async (req, res) => {
    /**
   * 1. Check if the items are in stock
   * 2. Calculate the total amount of the order
   * 3. Check mode of payment if COD, no change, if ONLINE, then redirect the user to payment gateway
   * 4. Place order (Save details into DB)
   * 5. Send a order confirmation email / SMS
   * 6. Reduce inventory / stock
   */

    const productIds = req.body.items.map((product) => product.product);
    const productsList = await Product.find({ _id: { $in: productIds } })

    const areItemsInStock = req.body.items.every(
        (p) => productsList.find((product) => product._id == p.product).stock >= p.qty
    );
    if (!areItemsInStock) {
        return res.status(400).json({ 
            success:false,
            message: "Sorry, some of the items are out of stock"
         });
    }

    let totalAmountToPay = productsList.reduce((total,product)=>{
        const productQty = req.body.items.find((p)=>p.product == product._id).qty;
        return total + product.price * productQty;
    },0);
   
    if(totalAmountToPay < 500){
        totalAmountToPay += 50;
    }

    if(req.body.modeOfPayment === 'ONLINE'){
        // Redirect to payment gateway
    }

    const orderDetails = {
        items: req.body.items,
        totalAmount:totalAmountToPay,
        deliveryAddress:req.body.deliveryAddress,
        billingAddress:req.body.billingAddress,
        modeOfPayment: req.body.modeOfPayment,
        orderStatus:'PENDING',
        user:req.user._id,

    };

    const { _id} = await Order.create(orderDetails);

    req.body.items.forEach(async(product)=>{
        await Product.findByIdAndUpdate(product.product,{
            $inc:{stock:-product.qty},
        })
    })

    return res.json({
        success: true,
        message: "Order placed successfully"
    })

}
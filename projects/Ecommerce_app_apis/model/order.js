import mongoose from "mongoose";


const itemSchema = {
    product: {
        type: mongoose.Types.ObjectId,
    },
    qty: {
        type: Number,
    }
}

const addressSchema = {
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
        required: false,
        default: "-",
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    _id: false,
};


const orderSchema = new mongoose.Schema({
    items: {
        type: [itemSchema],

    },
    totalAmount: {
        type: Number,
    },
    deliveryAddress: {
        type: addressSchema,

    },
    billingAddress: {
        type: addressSchema,

    },
    modeOfPayment: {
        type: String,
        enum: ['COD', 'ONLINE']
    },
    orderStatus: {
        type: String,
        enum: [
            "PENDING",
            "IN_PROCESS",
            "SHIPPED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "RETURNED",
            "CANCELLED",
        ],
        default: 'PENDING'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true, //createdAt ,UpdatedAt
});


export const Order = mongoose.model('Order', orderSchema);
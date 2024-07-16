import mongoose from "mongoose";

const address = {
    addressLine1:{
        type: String,
        required:true,
    },
    addressLine2:{
        type: String,
        required:false,
        default:"-",
    },
    city:{
        type: String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pincode:{
        type: Number,
        required:true,
    },
    _id:false,
};

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address:{
        type: address,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["CUSTOMER", "SELLER", "ADMIN"],
    },
    token:{
        type:String,
        required:false,
        default:"",
    }
});


export const User = mongoose.model('User', userSchema);
import { User } from "../model/userModel.js";
import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt";
import Jwt from 'jsonwebtoken';
export const signUp = asyncHandler(async (req, res) => {
    // ToDo: Validations

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newlyInsertedUser = await User.create({
        ...req.body,
        password: hashedPassword,
        role: "CUSTOMER",
    });
    res.json({
        success: true,
        message: "Registration completed, please login to continue",
    });
});


export const login = asyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password",
            })
        }
        
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const expiryTimeInSeconds = currentTimeInSeconds + 3600;

        const JwtPayload = {
            userId: user._id,
            role: user.role,
            email: user.email,
            expireIn: expiryTimeInSeconds,
        }
        const token = Jwt.sign(JwtPayload, process.env.JWT_SECRET);
        await User.findByIdAndUpdate(user._id, { $set: { token } });

        res.json({
            success: true,
            message: "Login successful",
            token: token,
        });
});


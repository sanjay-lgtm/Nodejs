import User from "../models/User.js";


export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    try {
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
        })
        const createUser = await user.save();
        res.status(201).json(createUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
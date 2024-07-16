import Jwt from 'jsonwebtoken';
import { User } from '../model/userModel';

export const verifyToken = async (req, res, next) => {
    /**
  * 1. If the token in present in request
  * 2. Check if the token is valid (Validate the generating source)
  * 3. If the token is expired
  * 4. User details validation
  */
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied'
            });
        }

        const token = bearerToken.split(" ")[1];
        Jwt.verify(token, process.env.JWT_SECRET);
        const decoded = Jwt.decode(token);
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        if (currentTimeInSeconds > decoded.expireIn) {
            //Token is expired
            return res.status(401).json({
                success: false,
                message: 'Token is expired'
            });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        })
    }
}
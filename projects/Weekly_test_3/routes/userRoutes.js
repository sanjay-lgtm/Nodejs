import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '../middlewares/validationMiddlewares.js';

const router = express.Router();

router.post('/register',validateName,validateEmail,validatePassword,validatePhoneNumber,registerUser)

export default router;
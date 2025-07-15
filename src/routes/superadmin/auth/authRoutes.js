import express from 'express';
import { signup, login } from '../../../controllers/superAdmin/auth/authController.js';
import lowercaseBody from '../../../middleware/lowercaseBody.js';

const router = express.Router();

// Admin Registration
router.post('/signup', lowercaseBody(['email']), signup);

// Admin Login
router.post('/login', lowercaseBody(['email']), login);

export default router;
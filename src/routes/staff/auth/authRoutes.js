import express from 'express';
import { login } from '../../../controllers/staff/auth/authController.js';
import lowercaseBody from '../../../middleware/lowercaseBody.js';

const router = express.Router();

router.post('/login', lowercaseBody(['email']), login);

export default router;
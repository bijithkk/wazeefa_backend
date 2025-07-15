import express from 'express';
import { createStaff } from '../../../controllers/superAdmin/staff/staffController.js';
import verifyToken from '../../../middleware/verifyToken.js';

const router = express.Router();

// Create staff
router.post('/',verifyToken(['superadmin']), createStaff);

export default router;
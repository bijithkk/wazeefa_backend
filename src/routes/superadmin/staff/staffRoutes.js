import express from 'express';
import { createStaff,updateStaff,getAllStaff,getSingleStaff,deleteStaff } from '../../../controllers/superAdmin/staff/staffController.js';
import verifyToken from '../../../middleware/verifyToken.js';

const router = express.Router();

// get all staffs
router.get('/',verifyToken(['superadmin']), getAllStaff);

// get staff by id
router.get('/:id',verifyToken(['superadmin']), getSingleStaff);

// Create staff
router.post('/',verifyToken(['superadmin']), createStaff);

// update staff
router.patch('/:id',verifyToken(['superadmin']), updateStaff);

// delete staff
router.delete('/:id',verifyToken(['superadmin']), deleteStaff);

export default router;
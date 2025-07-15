import express from 'express';
import { createStudent,getAllStudents,getSingleStudent,updateStudent,deleteStudent } from '../../../controllers/superAdmin/student/studentController.js';
import verifyToken from '../../../middleware/verifyToken.js';

const router = express.Router();

// Create a new student
router.post('/',verifyToken(['superadmin']), createStudent);

// Get all students
router.get('/',verifyToken(['superadmin']), getAllStudents);

// Get student by id
router.get('/:id',verifyToken(['superadmin']), getSingleStudent);

// update student by id
router.patch('/:id',verifyToken(['superadmin']), updateStudent);

// delete student by id
router.delete('/:id',verifyToken(['superadmin']), deleteStudent);

export default router;
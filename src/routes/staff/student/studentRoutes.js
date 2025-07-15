import express from 'express';
import { createStudent,getAllStudents,getSingleStudent,updateStudent,deleteStudent } from '../../../controllers/staff/student/studentController.js';
import verifyToken from '../../../middleware/verifyToken.js';
import checkPermission from '../../../middleware/checkPermission.js';

const router = express.Router();

// get all students
router.get('/', verifyToken('staff'), checkPermission('view'), getAllStudents);

// create student
router.post('/', verifyToken('staff'), checkPermission('create'), createStudent);

// get student by id
router.get('/:id', verifyToken('staff'), checkPermission('view'), getSingleStudent);

// update student
router.patch('/:id', verifyToken('staff'), checkPermission('edit'), updateStudent);

// delete student
router.delete('/:id', verifyToken('staff'), checkPermission('delete'), deleteStudent);

export default router;
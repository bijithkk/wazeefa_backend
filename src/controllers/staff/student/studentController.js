import Student from '../../../models/student/studentModel.js';
import catchAsync from '../../../utils/catchAsync.js';
import AppError from '../../../utils/appError.js';

export const createStudent = catchAsync(async (req, res, next) => {
    const { name, age, grade, contactInfo } = req.body;

    const student = await Student.create({ name, age, grade, contactInfo });

    res.status(201).json({
        status: true,
        message: 'Student created successfully',
        data: {
            student,
        }
    });
});

export const getAllStudents = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalStudents = await Student.countDocuments();

    const students = await Student.find()
        .skip(skip)
        .limit(limit);
    if (!students || students.length === 0) {
        return next(new AppError('No staff found', 404));
    }

    res.status(200).json({
        status: true,
        results: students.length,
        totalPages: Math.ceil(totalStudents / limit),
        currentPage: page,
        data: {
            students,
        },
    });
});

export const getSingleStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return next(new AppError('Student not found', 404));
    }
    res.status(200).json({
        status: true,
        data: {
            student,
        },
    });
});

export const updateStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!student) {
        return next(new AppError('Student not found', 404));
    }
    res.status(200).json({
        status: true,
        message: 'Student updated successfully',
        data: {
            student,
        },
    });
});

export const deleteStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
        return next(new AppError('Student not found', 404));
    }
    res.status(200).json({
        status: true,
        message: 'Student deleted successfully',
    });
});
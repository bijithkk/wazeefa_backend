import Staff from '../../../models/staff/staffModel.js';
import catchAsync from '../../../utils/catchAsync.js';
import AppError from '../../../utils/appError.js';

export const createStaff = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
        return next(new AppError("staff already exists", 409));
    }

    const newStaff = await Staff.create({ username, email, password, createdBy:req.user.id });

    const newStaffObj = newStaff.toObject();
    delete newStaffObj.password;

    res.status(201).json({
        status: true,
        message: 'Staff created successfully',
        data: {
            staff:newStaffObj,
        },
    });
});

export const updateStaff = catchAsync(async (req, res, next) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
        return next(new AppError('Staff not found', 404));
    }

    for (const key in req.body) {
        if (key !== 'password' && key !== 'passwordConfirm' && key !== 'permissions') {
            staff[key] = req.body[key];
        }
    }

    if (req.body.password || req.body.passwordConfirm) {
        if (!req.body.password || !req.body.passwordConfirm) {
            return next(new AppError('Both password and passwordConfirm are required to update password.', 400));
        }
        if (req.body.password !== req.body.passwordConfirm) {
            return next(new AppError('Passwords do not match.', 400));
        }
        staff.password = req.body.password;
        staff.passwordConfirm = req.body.passwordConfirm;
    }

    if (req.body.permissions) {
        for (const key in req.body.permissions) {
            staff.permissions[key] = req.body.permissions[key];
        }
    }

    await staff.save();

    const staffObj = staff.toObject();
    delete staffObj.password;
    res.status(200).json({
        status: true,
        message: 'Staff updated successfully',
        data: { staff: staffObj }
    });
});

export const getAllStaff = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalStaff = await Staff.countDocuments();

    const staffList = await Staff.find().skip(skip).limit(limit);
    if (!staffList || staffList.length === 0) {
        return next(new AppError('No staff found', 404));
    }
    res.status(200).json({
        status: true,
        results: staffList.length,
        totalPages: Math.ceil(totalStaff / limit),
        currentPage: page,
        data: { staff: staffList }
    });
});

export const getSingleStaff = catchAsync(async (req, res, next) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
        return next(new AppError('Staff not found', 404));
    }
    
    res.status(200).json({
        status: true,
        data: { staff }
    });
});

export const deleteStaff = catchAsync(async (req, res, next) => {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
        return next(new AppError('Staff not found', 404));
    }
    res.status(200).json({
        status: true,
        message: 'Staff deleted successfully'
    });
});
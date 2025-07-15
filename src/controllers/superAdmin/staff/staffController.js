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
    let updateData = { ...req.body };

    if (updateData.permissions) {
        for (const key in updateData.permissions) {
            updateData[`permissions.${key}`] = updateData.permissions[key];
        }
        delete updateData.permissions;
    }

    const staff = await Staff.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
    );
    if (!staff) {
        return next(new AppError('Staff not found', 404));
    }
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
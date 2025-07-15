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

import Staff from "../../../models/staff/staffModel.js";
import { generateAccessToken } from "../../../utils/token.js";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    const staff = await Staff.findOne({ email }).select("+password");

    if (!staff || !(await staff.correctPassword(password, staff.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    const payload = { id: staff._id, role: staff.role };
    const accessToken = generateAccessToken(payload);

    const staffObj = staff.toObject();
    delete staffObj.password;

    return res.status(200).json({
        status: true,
        message: "staff logged in successfully.",
        data: {
            staff: staffObj,
            accessToken
        },
    });
});

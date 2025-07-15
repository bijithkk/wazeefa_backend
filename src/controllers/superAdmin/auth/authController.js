import Superadmin from "../../../models/superAdmin/superAdminModel.js";
import { generateAccessToken } from "../../../utils/token.js";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";

export const signup = catchAsync(async (req, res, next) => {
    const {
        username,
        email,
        password,
        passwordConfirm,
    } = req.body;

    const existingAdmin = await Superadmin.findOne({ email });
    if (existingAdmin) {
        return next(new AppError("Admin already exists", 409));
    }

    const newAdmin = await Superadmin.create({
        username,
        email,
        password,
        passwordConfirm,
    });

    const newAdminObj = newAdmin.toObject();
    delete newAdminObj.password;

    res.status(201).json({
        status: true,
        message: "SignUp successful",
        data: {
            Superadmin: newAdminObj,
        },
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    const superadmin = await Superadmin.findOne({ email }).select("+password");

    if (!superadmin || !(await superadmin.correctPassword(password, superadmin.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    const payload = { id: superadmin._id, role: superadmin.role };
    const accessToken = generateAccessToken(payload);

    const adminObj = superadmin.toObject();
    delete adminObj.password;

    return res.status(200).json({
        status: true,
        message: "super admin logged in successfully.",
        data: {
            superadmin: adminObj,
            accessToken
        },
    });
});

import express from 'express';
import cors from 'cors';

// super admin
import superAdminAuthRoutes from './src/routes/superadmin/auth/authRoutes.js';
import superAdminStudentRoutes from './src/routes/superadmin/student/studentRoutes.js';
import superAdminStaffRoutes from './src/routes/superadmin/staff/staffRoutes.js';

// staff
import staffAuthRoutes from './src/routes/staff/auth/authRoutes.js';

// APP config
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes

// super admin
app.use('/superadmin/auth', superAdminAuthRoutes);
app.use('/superadmin/student', superAdminStudentRoutes);
app.use('/superadmin/staff', superAdminStaffRoutes);

// staff
app.use('/staff/auth', staffAuthRoutes);

// error handling
app.use((err, req, res, next) => {
    console.log('err', err);
    err.statusCode = err.statusCode || 500;

    // Boolean status based on statusCode
    let statusBoolean = false;
    if (err.statusCode >= 200 && err.statusCode < 400) {
        statusBoolean = true;
    }

    res.status(err.statusCode).json({
        status: statusBoolean,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});

export default app;
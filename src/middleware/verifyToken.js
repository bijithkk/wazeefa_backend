import jwt from 'jsonwebtoken';
import Staff from '../models/staff/staffModel.js';

const verifyAdminToken = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Access denied. No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (allowedRoles.length && !allowedRoles.includes(decodedToken.role)) {
        return res.status(401).json({ message: "Unauthorized. Access denied." });
      }

      if (decodedToken.role === 'staff') {
        const staff = await Staff.findById(decodedToken.id);
        if (!staff) {
          return res.status(401).json({ message: "Staff not found." });
        }
        req.user = {
          id: staff._id,
          role: staff.role,
          permissions: staff.permissions
        };
      } else {
        req.user = decodedToken;
      }
      next();

    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  };
};

export default verifyAdminToken;

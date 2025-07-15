export default function checkPermission(action) {
    return (req, res, next) => {
        if (req.user && req.user.permissions && req.user.permissions[action]) {
            return next();
        }
        return res.status(403).json({ status: false, message: 'insufficient permissions' });
    };
}
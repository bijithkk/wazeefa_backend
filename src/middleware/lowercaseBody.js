const lowercaseBody = (fields) => (req, res, next) => {
    if (req.body) {
        fields.forEach(field => {
            if (req.body[field] && typeof req.body[field] === 'string') {
                req.body[field] = req.body[field].toLowerCase();
            }
        });
    }
    next();
};

export default lowercaseBody;
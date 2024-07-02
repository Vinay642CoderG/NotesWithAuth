const jwt = require('jsonwebtoken');

const jwtSecretKey = '030a45f13074f889ea4ed496cfdae81f1fbb8b4029189d264e0845963f4f433b';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
};

module.exports = {authenticateToken, jwtSecretKey};
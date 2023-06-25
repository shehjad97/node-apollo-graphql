const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    const payload = {
        userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });

    return token;
};

const generateRefreshToken = (user) => {
    const payload = {
        userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });

    return token;
};

const verifyRefreshToken = (refreshToken) => {
    try {
        const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        return data;
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

const getUser = (req) => {
    const token = req.headers.authorization || '';
    if (token) {
        let tokenValue = token.replace('Bearer ', '');

        try {
            const user = jwt.verify(tokenValue, process.env.JWT_ACCESS_SECRET);
            return user;
        } catch (error) {
            console.error('Token verification error:', error);
            return null;
        }
    }
    return null;
}

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, getUser }
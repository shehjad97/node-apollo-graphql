const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: `${process.env.JWT_ACCESS_EXPIRATION}d`,
    });

    // const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    //     expiresIn: `${process.env.JWT_REFRESH_EXPIRATION}d`,
    // });

    // return { accessToken, refreshToken };
    return { accessToken };
}

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

module.exports = { generateToken, getUser }
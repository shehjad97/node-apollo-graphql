const jwt = require('jsonwebtoken');
const moment = require("moment");

const generateToken = (user) => {
    const accessExpiration = moment().add(parseInt(process.env.JWT_ACCESS_EXPIRATION), "days");
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: accessExpiration,
    });

    // const refreshExpiration = moment().add(parseInt(process.env.JWT_REFRESH_EXPIRATION), "days");
    // const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    //     expiresIn: refreshExpiration,
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
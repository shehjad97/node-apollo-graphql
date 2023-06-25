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

const getUser = (token) => {
    if (token) {
        const tokenValue = token.replace('Bearer ', '');
        const user = jwt.verify(tokenValue, process.env.JWT_ACCESS_SECRET);
        // const user = process.env.JWT_ACCESS_SECRET;
        return user;
    }

    return null;
}

module.exports = { generateToken, getUser }
const bcrypt = require('bcrypt');

const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../../utils/auth');

const { UserModel } = require('../../models/User.model');

const authResolvers = {
    Mutation: {
        register: async (_, { username, email, password }) => {
            try {
                const isSuperAdmin = await UserModel.countDocuments() === 0;

                const existingUser = await UserModel.findOne({
                    $or: [{ username }, { email }],
                });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                const user = new UserModel({
                    username,
                    email,
                    password,
                    superAdmin: isSuperAdmin,
                });
                await user.save();

                return { user };
            } catch (error) {
                throw new Error(error.message);
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    throw new Error('Invalid credentials');
                }

                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if (!isPasswordMatch) {
                    throw new Error('Invalid credentials');
                }

                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                return { user, accessToken, refreshToken };
            } catch (error) {
                throw new Error(error.message);
            }
        },
        refreshToken: async (_, { refreshToken }) => {
            try {
                const data = verifyRefreshToken(refreshToken);

                const user = await UserModel.findById(data.userId);
                if (!user) {
                    throw new Error('User not found');
                }

                const accessToken = generateAccessToken(user);

                return { accessToken };
            } catch (error) {
                throw new Error('Invalid refresh token');
            }
        },
        makeAdmin: async (_, { userId }) => {
            try {
                const user = await UserModel.findByIdAndUpdate(
                    userId,
                    { superAdmin: true },
                    { new: true }
                );

                if (!user) {
                    throw new Error('User not found');
                }

                return { user };
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
};

module.exports = authResolvers;
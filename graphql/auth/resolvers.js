const bcrypt = require('bcrypt');

const { generateToken } = require('./../../utils/auth');

const { UserModel } = require('./../../models/User.model');

const authResolvers = {
    Mutation: {
        register: async (_, { username, email, password }) => {
            try {
                const existingUser = await UserModel.findOne({
                    $or: [{ username }, { email }],
                });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                const hashedPassword = await bcrypt.hash(password, 8);
                const user = new UserModel({
                    username,
                    email,
                    password: hashedPassword,
                    superAdmin: false,
                });
                await user.save();

                const userData = user.toObject();
                delete userData.password;

                return { user: userData };
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

                // const isPasswordMatch = await bcrypt.compare(password, user.password);
                // if (!isPasswordMatch) {
                //     throw new Error('Invalid credentials');
                // }

                const { accessToken } = generateToken(user);

                const userData = user.toObject();
                delete userData.password;

                return { user: userData, accessToken };
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
};

module.exports = authResolvers;
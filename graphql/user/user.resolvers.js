const { UserModel } = require('../../models/User.model');

const userResolvers = {
    Query: {
        getUser: async (_, { id }) => {
            try {
                const user = await UserModel.findById(id);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        getAllUsers: async () => {
            try {
                const users = await UserModel.find();
                return users;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password, superAdmin }) => {
            try {
                const user = new UserModel({ username, email, password, superAdmin });
                const result = await user.save();
                return result;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updateUser: async (_, { id, username, email, password, superAdmin }) => {
            try {
                const user = await UserModel.findByIdAndUpdate(
                    id,
                    { username, email, password, superAdmin },
                    { new: true }
                );
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deleteUser: async (_, { id }) => {
            try {
                const user = await UserModel.findByIdAndRemove(id);
                if (!user) {
                    throw new Error('User not found');
                }
                return { success: true, message: 'User deleted' };
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
};

module.exports = userResolvers;

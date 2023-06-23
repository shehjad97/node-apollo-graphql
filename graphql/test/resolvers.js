const { TestModel } = require('./../../models/Test.model');

const testResolvers = {
    Query: {
        getAllTests: async () => {
            try {
                const tests = await TestModel.find();
                return tests;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        getTest: async (_, { id }) => {
            try {
                const test = await TestModel.findById(id);
                if (!test) {
                    throw new Error('Test not found');
                }
                return test;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    Mutation: {
        createTest: async (_, { dummyText }) => {
            try {
                const test = new TestModel({ dummyText });
                const result = await test.save();
                return result;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updateTest: async (_, { id, dummyText }) => {
            try {
                const test = await TestModel.findByIdAndUpdate(id, { dummyText }, { new: true });
                if (!test) {
                    throw new Error('Test not found');
                }
                return test;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        deleteTest: async (_, { id }) => {
            try {
                const test = await TestModel.findByIdAndRemove(id);
                if (!test) {
                    throw new Error('Test not found');
                }
                return { success: true, message: 'Test deleted' };
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
};

module.exports = testResolvers;
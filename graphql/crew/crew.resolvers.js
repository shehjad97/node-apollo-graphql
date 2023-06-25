const { CrewModel } = require('./../../models/Crew.model');

const crewResolvers = {
  Query: {
    getCrew: async (_, { id }) => {
      try {
        const crew = await CrewModel.findById(id);
        if (!crew) {
          throw new Error('Crew not found');
        }
        return crew;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAllCrews: async () => {
      try {
        const crews = await CrewModel.find();
        return crews;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createCrew: async (_, { name, biography, dateOfBirth, gender, nationality }) => {
      try {
        const crew = new CrewModel({ name, biography, dateOfBirth, gender, nationality });
        const result = await crew.save();
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateCrew: async (_, { id, name, biography, dateOfBirth, gender, nationality }) => {
      try {
        const crew = await CrewModel.findByIdAndUpdate(
          id,
          { name, biography, dateOfBirth, gender, nationality },
          { new: true }
        );
        if (!crew) {
          throw new Error('Crew not found');
        }
        return crew;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteCrew: async (_, { id }) => {
      try {
        const crew = await CrewModel.findByIdAndRemove(id);
        if (!crew) {
          throw new Error('Crew not found');
        }
        return { success: true, message: 'Crew deleted' };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = crewResolvers;

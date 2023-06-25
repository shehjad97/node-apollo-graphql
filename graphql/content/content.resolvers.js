const { ContentModel } = require('./../../models/Content.model');

const contentResolvers = {
  Query: {
    getAllContents: async () => {
      try {
        const contents = await ContentModel.find();
        return contents;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getContent: async (_, { id }) => {
      try {
        const content = await ContentModel.findById(id);
        if (!content) {
          throw new Error('Content not found');
        }
        return content;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createContent: async (_, { title, description, type, genre, runtime, actors, directors, producers, staff }) => {
      try {
        const content = new ContentModel({
          title,
          description,
          type,
          genre,
          runtime,
          actors,
          directors,
          producers,
          staff,
        });
        const result = await content.save();
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateContent: async (_, { id, title, description, type, genre, runtime, actors, directors, producers, staff }) => {
      try {
        const content = await ContentModel.findByIdAndUpdate(
          id,
          {
            title,
            description,
            type,
            genre,
            runtime,
            actors,
            directors,
            producers,
            staff,
          },
          { new: true }
        );
        if (!content) {
          throw new Error('Content not found');
        }
        return content;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteContent: async (_, { id }) => {
      try {
        const content = await ContentModel.findByIdAndRemove(id);
        if (!content) {
          throw new Error('Content not found');
        }
        return { success: true, message: 'Content deleted' };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = contentResolvers;

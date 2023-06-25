const contentType = `
  type Runtime {
    hours: Int!
    minutes: Int!
  }

  type Actor {
    _id: ID!
    character: String
  }

  type Director {
    _id: ID!
  }

  type Producer {
    _id: ID!
  }

  type Staff {
    _id: ID!
  }

  type Content {
    id: ID!
    title: String!
    description: String!
    type: String!
    genre: String
    runtime: Runtime!
    actors: [Actor]
    directors: [Director]
    producers: [Producer]
    staff: [Staff]
    createdAt: String!
    updatedAt: String!
  }

  type DeleteContentResponse {
    success: Boolean!
    message: String
  }

  input RuntimeInput {
    hours: Int!
    minutes: Int!
  }

  input ActorInput {
    _id: ID!
    character: String
  }

  input DirectorInput {
    _id: ID!
  }

  input ProducerInput {
    _id: ID!
  }

  input StaffInput {
    _id: ID!
  }

  type Query {
    getAllContents: [Content!]!
    getContent(id: ID!): Content!
  }

  type Mutation {
    createContent(
      title: String!,
      description: String!,
      type: String!,
      genre: String,
      runtime: RuntimeInput!,
      actors: [ActorInput],
      directors: [DirectorInput],
      producers: [ProducerInput],
      staff: [StaffInput],
    ): Content!
    updateContent(
      id: ID!,
      title: String,
      description: String,
      type: String,
      genre: String,
      runtime: RuntimeInput,
      actors: [ActorInput],
      directors: [DirectorInput],
      producers: [ProducerInput],
      staff: [StaffInput],
    ): Content!
    deleteContent(id: ID!): DeleteContentResponse!
  }
`;

module.exports = contentType;

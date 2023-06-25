const crewType = `
  type Crew {
    id: ID!
    name: String!
    biography: String
    dateOfBirth: String
    gender: String!
    nationality: String
    createdAt: String!
    updatedAt: String!
  }

  type DeleteCrewResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getCrew(id: ID!): Crew!
    getAllCrews: [Crew!]!
  }

  type Mutation {
    createCrew(name: String!, biography: String, dateOfBirth: String, gender: String!, nationality: String): Crew!
    updateCrew(id: ID!, name: String!, biography: String, dateOfBirth: String, gender: String!, nationality: String): Crew!
    deleteCrew(id: ID!): DeleteCrewResponse!
  }
`;

module.exports = crewType;

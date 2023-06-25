const testType = `
  type Test {
    id: ID!
    dummyText: String!
    createdAt: String!
    updatedAt: String!
  }

  type DeleteTestResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getTest(id: ID!): Test!
    getAllTests: [Test!]!
  }

  type Mutation {
    createTest(dummyText: String!): Test!
    updateTest(id: ID!, dummyText: String!): Test!
    deleteTest(id: ID!): DeleteTestResponse!
  }
`;

module.exports = testType;
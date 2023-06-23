const testType = `
  type Test {
    id: ID!
    dummyText: String!
    createdAt: String!
    updatedAt: String!
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

  type DeleteTestResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = testType;
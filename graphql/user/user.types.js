const userType = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    superAdmin: Boolean
    createdAt: String!
    updatedAt: String!
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String
  }

  type Query {
    getUser(id: ID!): User!
    getAllUsers: [User!]!
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      superAdmin: Boolean
    ): User!
    updateUser(
      id: ID!
      username: String!
      email: String!
      password: String!
      superAdmin: Boolean
    ): User!
    deleteUser(id: ID!): DeleteUserResponse!
  }
`;

module.exports = userType;

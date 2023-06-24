const authType = `
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type RegisterResponse {
    user: User!
  }

  type LoginResponse {
    user: User!
    accessToken: String!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;

module.exports = authType;
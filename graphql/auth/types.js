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
    refreshToken: String!
  }

  type RefreshTokenResponse {
    accessToken: String!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
    refreshToken(refreshToken: String!): RefreshTokenResponse!
  }
`;

module.exports = authType;
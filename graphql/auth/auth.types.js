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

  type MakeAdminResponse {
    user: User!
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
    refreshToken(refreshToken: String!): RefreshTokenResponse!
    makeAdmin(userId: ID!): MakeAdminResponse!
  }
`;

module.exports = authType;
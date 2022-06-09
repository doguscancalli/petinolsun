const { gql } = require('@apollo/client')

const UserType = gql`
  # Type
  scalar Date
  type User {
    id: ID!
    name: String!
    email: String!
    isAdmin: Boolean!
    isBanned: Boolean
    token: String
    resetPasswordToken: String
    resetPasswordExpire: Date
    createdAt: Date!
    updatedAt: Date!
  }
  type Users {
    docs: [User!]!
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    prevPage: Int
    nextPage: Int
  }

  # Input
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input UpdateUserInput {
    name: String
    email: String
    isAdmin: Boolean
    isBanned: Boolean
  }
  input FilterUsersInput {
    limit: String
    page: String
    createdAt: String
    sort: String
  }

  # Query
  type Query {
    users(input: FilterUsersInput!): Users!
    user(id: ID!): User!
    me: User
  }

  # Mutation
  type Mutation {
    registerUser(input: RegisterInput!): User!
    loginUser(input: LoginInput!): User!
    deleteUser(id: ID!): Boolean!
    deleteAllUsers: Boolean!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    forgotPassword(email: String!): Boolean!
    resetPassword(token: String!, password: String!): Boolean!
    updatePassword(password: String!, newPassword: String!): Boolean!
  }
`

export default UserType

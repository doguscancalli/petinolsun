const { gql } = require('@apollo/client')

const PostType = gql`
  # Scalar
  scalar Date
  scalar UserSchema

  # Type
  type Post {
    id: ID!
    title: String!
    slug: String!
    description: String!
    user: UserSchema!
    createdAt: Date!
    updatedAt: Date!
  }
  type Posts {
    docs: [Post!]!
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    prevPage: Int
    nextPage: Int
  }

  # Input
  input CreatePostInput {
    title: String!
    description: String!
  }
  input UpdatePostInput {
    title: String
    description: String
  }
  input FilterPostsInput {
    limit: String
    page: String
    createdAt: String
    sort: String
    user: UserSchema
  }

  # Query
  type Query {
    posts(input: FilterPostsInput!): Posts!
    post(slug: String!): Post!
  }

  # Mutation
  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    deleteAllPosts: Boolean!
  }
`

export default PostType

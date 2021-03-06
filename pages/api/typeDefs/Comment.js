const { gql } = require('@apollo/client')

const CommentType = gql`
  # Scalar
  scalar Date
  scalar UserSchema
  scalar PostSchema

  # Type
  type Comment {
    id: ID!
    comment: String!
    user: UserSchema!
    post: PostSchema!
    createdAt: Date!
    updatedAt: Date!
  }
  type Comments {
    docs: [Comment!]!
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    prevPage: Int
    nextPage: Int
  }

  # Input
  input CreateCommentInput {
    comment: String!
    post: PostSchema!
  }
  input UpdateCommentInput {
    comment: String
  }
  input FilterCommentsInput {
    limit: String
    page: String
    createdAt: String
    sort: String
    user: String
    post: String
  }

  # Query
  type Query {
    comments(input: FilterCommentsInput!): Comments!
  }

  # Mutation
  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
    updateComment(id: ID!, input: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Boolean!
    deleteAllComments: Boolean!
  }
`

export default CommentType

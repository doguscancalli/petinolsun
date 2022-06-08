const { gql } = require('@apollo/client')

const ReportType = gql`
  # Scalar
  scalar Date
  scalar UserSchema
  scalar PostSchema

  # Type
  type Report {
    id: ID!
    reportedBy: UserSchema!
    reportedTopic: String!
    reportedTopicId: PostSchema!
    createdAt: Date!
    updatedAt: Date!
  }
  type Reports {
    docs: [Report!]!
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    prevPage: Int
    nextPage: Int
  }

  # Input
  input CreateReportInput {
    reportedBy: String!
    reportedTopic: String!
    reportedTopicId: String!
  }
  input FilterReportsInput {
    limit: String
    page: String
    createdAt: String
    sort: String
    user: UserSchema
  }

  # Query
  type Query {
    reports(input: FilterReportsInput!): Reports!
  }

  # Mutation
  type Mutation {
    createReport(input: CreateReportInput!): Report!
    deleteReport(id: String!): Boolean!
    deleteReport(id: ID!): Boolean!
    deleteAllReports: Boolean!
  }
`

export default ReportType

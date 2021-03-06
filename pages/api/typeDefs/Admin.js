const { gql } = require('@apollo/client')

const AdminType = gql`
  # Type
  type Count {
    id: ID!
    title: String!
    count: Int!
  }
  type Counts {
    counts: [Count!]!
  }
  type SeoSettings {
    id: ID!
    title: String!
    description: String!
    keywords: String!
  }

  # Input
  input SeoSettingsInput {
    title: String
    description: String
    keywords: String
  }

  # Query
  type Query {
    counts: Counts!
    seoSettings: SeoSettings!
  }

  # Mutation
  type Mutation {
    updateSeoSettings(input: SeoSettingsInput!): SeoSettings!
  }
`

export default AdminType

const { gql } = require('@apollo/client')

const PetPostType = gql`
  # Scalar
  scalar Date
  scalar UserSchema

  # Enum
  enum PostType {
    ADOPTION
    OWNERSHIP
    LOST
    FOUND
  }
  enum Animal {
    DOG
    CAT
    RODENT
    FISH
    RABBIT
    BIRD
    OTHER
  }
  enum Gender {
    MALE
    FEMALE
    UNKNOWN
  }
  enum Age {
    BABY
    YOUNG
    ADULT
    OLD
    UNKNOWN
  }

  # Type
  type PetPost {
    id: ID!
    name: String!
    slug: String!
    postType: PostType!
    city: String!
    district: String!
    animal: Animal!
    age: Age!
    gender: Gender!
    description: String!
    photos: [String!]!
    contactNumber: String!
    whatsapp: Boolean!
    user: UserSchema!
    createdAt: Date!
    updatedAt: Date!
    listing: Boolean!
  }
  type PetPosts {
    docs: [PetPost!]!
    totalDocs: Int
    limit: Int
    totalPages: Int
    page: Int
    prevPage: Int
    nextPage: Int
  }

  # Input
  input CreatePetPostInput {
    name: String!
    postType: PostType!
    city: String!
    district: String!
    animal: Animal!
    age: Age!
    gender: Gender!
    description: String!
    photos: [String!]!
    contactNumber: String!
    whatsapp: Boolean = false
    listing: Boolean = true
  }
  input UpdatePetPostInput {
    name: String
    postType: PostType
    city: String
    district: String
    animal: Animal
    age: Age
    gender: Gender
    description: String
    photos: [String!]
    contactNumber: String
    whatsapp: Boolean = false
    listing: Boolean
    user: UserSchema
  }
  input FilterPetPostsInput {
    limit: String
    page: String
    createdAt: String
    postType: String
    animal: String
    city: String
    district: String
    gender: String
    age: String
    listing: Boolean
    sort: String
    user: UserSchema
  }

  # Query
  type Query {
    petPosts(input: FilterPetPostsInput!): PetPosts!
    petPost(slug: String!): PetPost!
  }

  # Mutation
  type Mutation {
    createPetPost(input: CreatePetPostInput!): PetPost!
    updatePetPost(id: ID!, input: UpdatePetPostInput!): PetPost!
    deletePetPost(id: ID!): Boolean!
    deleteAllPetPosts: Boolean!
  }
`

export default PetPostType

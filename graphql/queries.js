import { gql } from '@apollo/client'

export const GET_ALL_PET_POSTS = gql`
  query PetPosts($input: FilterPetPostsInput!) {
    petPosts(input: $input) {
      docs {
        id
        name
        slug
        postType
        location
        animal
        age
        gender
        description
        photos
        contactNumber
        whatsapp
        user
        createdAt
        updatedAt
      }
      totalDocs
      limit
      totalPages
      page
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
    }
  }
`

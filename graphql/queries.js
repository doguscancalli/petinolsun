import { gql } from '@apollo/client'

export const ME = gql`
  query Me {
    me {
      id
      name
      email
      isAdmin
      token
      resetPasswordToken
      resetPasswordExpire
      createdAt
      updatedAt
    }
  }
`

export const GET_ALL_PET_POSTS = gql`
  query PetPosts($input: FilterPetPostsInput!) {
    petPosts(input: $input) {
      docs {
        id
        name
        slug
        postType
        city
        district
        animal
        age
        gender
        description
        photos
        contactNumber
        whatsapp
        listing
        user
        createdAt
        updatedAt
      }
      totalDocs
      limit
      totalPages
      page
      prevPage
      nextPage
    }
  }
`
export const GET_PET_POST = gql`
  query PetPost($slug: String!) {
    petPost(slug: $slug) {
      id
      name
      slug
      postType
      city
      district
      animal
      age
      gender
      description
      photos
      contactNumber
      whatsapp
      listing
      user
      createdAt
      updatedAt
    }
  }
`

export const GET_ALL_POSTS = gql`
  query Posts($input: FilterPostsInput!) {
    posts(input: $input) {
      docs {
        id
        title
        slug
        description
        user
        createdAt
        updatedAt
      }
      totalDocs
      limit
      totalPages
      page
      prevPage
      nextPage
    }
  }
`

export const GET_POST = gql`
  query Post($slug: String!) {
    post(slug: $slug) {
      id
      title
      slug
      description
      user
      createdAt
      updatedAt
    }
  }
`

export const GET_ALL_COMMENTS = gql`
  query Comments($input: FilterCommentsInput!) {
    comments(input: $input) {
      docs {
        id
        comment
        user
        post
        createdAt
        updatedAt
      }
      totalDocs
      limit
      totalPages
      page
      prevPage
      nextPage
    }
  }
`

export const GET_ALL_USERS = gql`
  query Users($input: FilterUsersInput!) {
    users(input: $input) {
      docs {
        id
        name
        email
        isAdmin
        token
        resetPasswordToken
        resetPasswordExpire
        createdAt
        updatedAt
      }
      totalDocs
      limit
      totalPages
      page
      prevPage
      nextPage
    }
  }
`

export const GET_COUNTS = gql`
  query Counts {
    counts {
      counts {
        title
        count
      }
    }
  }
`

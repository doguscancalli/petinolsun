import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    loginUser(input: $input) {
      id
      name
      email
      isAdmin
      token
    }
  }
`
export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    registerUser(input: $input) {
      id
      name
      email
      isAdmin
      token
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
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

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($password: String!, $newPassword: String!) {
    updatePassword(password: $password, newPassword: $newPassword)
  }
`

export const CREATE_PET_POST = gql`
  mutation CreatePetPost($input: CreatePetPostInput!) {
    createPetPost(input: $input) {
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
      user
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_PET_POST = gql`
  mutation UpdatePetPost($id: ID!, $input: UpdatePetPostInput!) {
    updatePetPost(id: $id, input: $input) {
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

export const DELETE_PET_POST = gql`
  mutation DeletePetPost($id: ID!) {
    deletePetPost(id: $id)
  }
`
export const CREATE_REPORT = gql`
  mutation CreateReport($input: CreateReportInput!) {
    createReport(input: $input) {
      id
      reportedBy
      reportedTopic
      reportedTopicId
      createdAt
      updatedAt
    }
  }
`

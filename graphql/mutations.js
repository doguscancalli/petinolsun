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

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($resetEmail: String!) {
    forgotPassword(email: $resetEmail)
  }
`

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetToken: String!, $password: String!) {
    resetPassword(token: $resetToken, password: $password)
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

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      description
      slug
      user
      createdAt
      updatedAt
    }
  }
`
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
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

export const DELTE_ALL_POSTS = gql`
  mutation Mutation {
    deleteAllPosts
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      comment
      user
      post
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      id
      comment
      user
      post
      createdAt
      updatedAt
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`

export const DELETE_ALL_COMMENTS = gql`
  mutation Mutation {
    deleteAllComments
  }
`

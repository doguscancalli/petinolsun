import { verify } from 'jsonwebtoken'
import { GraphQLYogaError } from '@graphql-yoga/node'

export default async (context) => {
  const authHeader = context.req.headers.authorization
  const authCookie = context.req.cookies.token
  let token
  let user

  if (authHeader) {
    token = authHeader.split('Bearer ')[1]
  }
  if (authCookie) {
    token = authCookie
  }
  if (token) {
    try {
      const tokenUser = verify(token, process.env.JWT_SECRET)
      context.req.user = tokenUser
      user = tokenUser
    } catch (err) {
      throw new GraphQLYogaError('Invalid/Expired token')
    }
  } else {
    throw new GraphQLYogaError('Authorization header must be provided')
  }
  const dbUser = await context.User.findById(user.id)
  if (!dbUser) throw new GraphQLYogaError('Kullanıcı bulunamadı')
  if (dbUser.isBanned) throw new GraphQLYogaError('Kullanıcı engellendi')
  return user
}

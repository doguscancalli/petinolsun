import { verify } from 'jsonwebtoken'
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
      throw new Error('Invalid/Expired token')
    }
  } else {
    throw new Error('Authorization header must be provided')
  }
  const isUserExists = await context.User.exists({ _id: user.id })
  if (!isUserExists) throw new Error('Kullanıcı bulunamadı')
  return user
}

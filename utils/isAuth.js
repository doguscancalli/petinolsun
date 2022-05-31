import { verify } from 'jsonwebtoken'

export default (context) => {
  const authHeader = context.req.headers.authorization
  const authCookie = context.req.cookies.token

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = verify(token, process.env.JWT_SECRET)
        context.req.user = user
        return user
      } catch (err) {
        throw new Error('Invalid/Expired token')
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]")
  }
  if (authCookie) {
    const token = authCookie
    if (token) {
      try {
        const user = verify(token, process.env.JWT_SECRET)
        context.req.user = user
        return user
      } catch (err) {
        throw new Error('Invalid/Expired token')
      }
    }
  }
  throw new Error('Authorization header must be provided')
}

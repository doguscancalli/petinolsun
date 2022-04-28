import { verify } from 'jsonwebtoken'

export default (context) => {
  const authHeader = context.req.headers.authorization
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
  throw new Error('Authorization header must be provided')
}

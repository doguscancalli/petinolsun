export default (context) => {
  if (context.req.user && context.req.user.isAdmin) {
    return true
  } else {
    throw new Error('Invalid admin token')
  }
}

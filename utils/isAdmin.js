import { GraphQLYogaError } from '@graphql-yoga/node'

export default (context) => {
  if (context.req.user && context.req.user.isAdmin) {
    return true
  } else {
    throw new GraphQLYogaError('Invalid admin token')
  }
}

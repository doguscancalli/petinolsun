import { createServer } from '@graphql-yoga/node'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: ({ req }) => ({ req }),
})

export default server

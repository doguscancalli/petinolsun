import { createServer } from '@graphql-yoga/node'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { connectDb, isAuth, isAdmin } from '@utils'

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: ({ req }) => ({ req, isAuth, isAdmin }),
})

connectDb()

export default server

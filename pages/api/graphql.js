import { createServer } from '@graphql-yoga/node'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { connectDb, isAuth, isAdmin } from '@utils'
import User from 'pages/api/models/User'

const server = createServer({
  graphiql: false,
  schema: {
    typeDefs,
    resolvers,
  },
  context: ({ req }) => ({ req, isAuth, isAdmin, User }),
})

connectDb()

export default server

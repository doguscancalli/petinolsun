import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
  uri: `${process.env.APP_BASE_URL}/api/graphql`,
  cache: new InMemoryCache(),
})

import { ApolloClient, InMemoryCache } from '@apollo/client'

export default new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/graphql`,
  cache: new InMemoryCache(),
})

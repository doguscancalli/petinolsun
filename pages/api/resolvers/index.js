import { mergeResolvers } from '@graphql-tools/merge'

import UserResolver from './User'
import PetPostResolver from './PetPost'

const resolvers = [UserResolver, PetPostResolver]

export default mergeResolvers(resolvers)

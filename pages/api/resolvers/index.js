import { mergeResolvers } from '@graphql-tools/merge'

import UserResolver from './User'
import PetPostResolver from './PetPost'
import ReportResolver from './Report'

const resolvers = [UserResolver, PetPostResolver, ReportResolver]

export default mergeResolvers(resolvers)

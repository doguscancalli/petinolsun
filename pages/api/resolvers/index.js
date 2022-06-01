import { mergeResolvers } from '@graphql-tools/merge'

import UserResolver from './User'
import PetPostResolver from './PetPost'
import ReportResolver from './Report'
import PostResolver from './Post'
import CommentResolver from './Comment'

const resolvers = [
  UserResolver,
  PetPostResolver,
  ReportResolver,
  PostResolver,
  CommentResolver,
]

export default mergeResolvers(resolvers)

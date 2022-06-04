import { mergeResolvers } from '@graphql-tools/merge'

import UserResolver from './User'
import PetPostResolver from './PetPost'
import ReportResolver from './Report'
import PostResolver from './Post'
import CommentResolver from './Comment'
import CountsResolver from './Counts'

const resolvers = [
  UserResolver,
  PetPostResolver,
  ReportResolver,
  PostResolver,
  CommentResolver,
  CountsResolver,
]

export default mergeResolvers(resolvers)

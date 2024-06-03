import { GraphQLObjectType } from 'graphql';
import { taskById, tasks } from '../model/task/graphql-schema/task-query';
import { categories } from '../model/category/graphql-schema/category-query';
import { GlobalContext } from './global-context';
import { me } from '../model/user/graphql-schema/user-query';

export const query = new GraphQLObjectType<void, GlobalContext>({
  name: 'Query',
  fields: () => ({
    me,
    tasks,
    taskById,
    categories,
  }),
});

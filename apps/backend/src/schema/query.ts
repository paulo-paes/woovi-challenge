import { GraphQLObjectType } from 'graphql';
import { taskById, taskQuery } from '../task/graphql-schema/task-query';
import { categoryQuery } from '../category/graphql-schema/category-query';
import { GlobalContext } from './global-context';

export const query = new GraphQLObjectType<void, GlobalContext>({
  name: 'Query',
  fields: () => ({
    tasks: taskQuery,
    taskById,
    categories: categoryQuery
  }),
});

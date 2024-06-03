import { GraphQLObjectType } from 'graphql';
import { taskById, taskQuery } from '../task/graphql-schema/task-query';
import { categoryQuery } from '../category/graphql-schema/category-query';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    tasks: taskQuery,
    taskById,
    categories: categoryQuery
  }),
});

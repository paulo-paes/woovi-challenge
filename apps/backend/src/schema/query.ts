import { GraphQLObjectType } from 'graphql';
import { taskQuery } from '../tasks/graphql-schema/task-query';
import { categoryQuery } from '../category/graphql-schema/category-query';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    tasks: taskQuery,
    categories: categoryQuery
  }),
});

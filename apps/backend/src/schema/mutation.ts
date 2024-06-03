import { GraphQLObjectType } from 'graphql';
import {
  createTask,
  deleteTask,
  updateTask,
} from '../tasks/graphql-schema/task-mutation';
import { createCategory } from '../category/graphql-schema/category-mutation';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createTask,
    updateTask,
    deleteTask,
    createCategory
  }),
});

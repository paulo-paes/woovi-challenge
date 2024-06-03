import { GraphQLObjectType } from 'graphql';
import {
  createTask,
  deleteTask,
  updateTask,
} from '../model/task/graphql-schema/task-mutation';
import { createCategory } from '../model/category/graphql-schema/category-mutation';
import { login, registerUser } from '../model/user/graphql-schema/user-mutation';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createTask,
    updateTask,
    deleteTask,
    createCategory,
    registerUser,
    login,
  }),
});

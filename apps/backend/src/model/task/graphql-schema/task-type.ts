import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TaskDocument } from '../mongoose-schema/task-mongoose-schema';
import { categoryType } from '../../category/graphql-schema/category-type';
import { CategoryModel } from '../../category/mongoose-schema/category-mongoose-schema';

type TaskTypeInput = Omit<TaskDocument, 'category'> & {
  category: string;
};

export const taskType = new GraphQLObjectType<TaskTypeInput>({
  name: 'Task',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (task) => task.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (task) => task.name,
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (task) => task.description,
    },
    done: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (task) => task.done,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'created date in ISO format',
      resolve: (task) => task.createdAt.toISOString(),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'last updated date in ISO format',
      resolve: (task) => task.updatedAt.toISOString(),
    },
    category: {
      type: new GraphQLNonNull(categoryType),
      resolve: async (task) => {
        return CategoryModel.findById(task.category);
      },
    },
  }),
});

export interface CreateTaskInput {
  name: string;
  description: string;
  categoryId: string;
}

export const createTaskInputType = new GraphQLInputObjectType({
  name: 'CreateTaskInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export interface UpdateTaskInput {
  id: string;
  name: string;
  description: string;
}

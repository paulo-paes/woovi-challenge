import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TaskDocument } from '../mongoose-schema/task-mongoose-schema';

export const taskType = new GraphQLObjectType<TaskDocument>({
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
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'created date in ISO format',
      resolve: (task) => task.createdAt,
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'last updated date in ISO format',
      resolve: (task) => task.updatedAt,
    },
  }),
});

export interface CreateTaskInput {
  input: {
    name: string;
    description: string;
  }
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
  input: {
    id: string;
    name: string;
    description: string;
  }
}

export const updateTaskInputType = new GraphQLInputObjectType({
  name: 'UpdateTaskInput',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

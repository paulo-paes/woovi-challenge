import {
  GraphQLError,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { CreateTaskInput, UpdateTaskInput, taskType } from './task-type';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';
import { GlobalContext } from '../../schema/global-context';

export const createTask: GraphQLFieldConfig<
  void,
  GlobalContext,
  CreateTaskInput
> = {
  type: new GraphQLNonNull(taskType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, input, context) => {
    const task = new TaskModel();
    task.name = input.name;
    task.description = input.description;
    await task.save();
    return task;
  },
};

export const updateTask: GraphQLFieldConfig<
  void,
  GlobalContext,
  UpdateTaskInput
> = {
  type: new GraphQLNonNull(taskType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, input) => {
    const task = await TaskModel.findOne({
      _id: input.id,
    });

    if (!task) throw new Error('Not found');

    task.name = input.name;
    task.description = input.description;
    await task.save();
    return task;
  },
};

export const deleteTask: GraphQLFieldConfig<
  void,
  GlobalContext,
  { id: string }
> = {
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id }, context) => {
    if (!context.user) {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
    const task = await TaskModel.findOne({
      _id: id,
    });

    if (!task) throw new Error('Not found');

    await TaskModel.deleteOne({
      _id: task.id,
    });

    return id;
  },
};

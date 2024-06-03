import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  CreateTaskInput,
  UpdateTaskInput,
  createTaskInputType,
  taskType,
  updateTaskInputType,
} from './task-type';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';

export const createTask: GraphQLFieldConfig<void, any, CreateTaskInput> = {
  type: new GraphQLNonNull(taskType),
  args: {
    input: {
      type: new GraphQLNonNull(createTaskInputType),
    },
  },
  resolve: async (_, { input }) => {
    const task = new TaskModel();
    task.name = input.name;
    task.description = input.description;
    await task.save();
    return task;
  },
};

export const updateTask: GraphQLFieldConfig<void, any, UpdateTaskInput> = {
  type: new GraphQLNonNull(taskType),
  args: {
    input: {
      type: new GraphQLNonNull(updateTaskInputType),
    },
  },
  resolve: async (_, { input }) => {
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

export const deleteTask: GraphQLFieldConfig<void, any, { id: string }> = {
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id }) => {
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

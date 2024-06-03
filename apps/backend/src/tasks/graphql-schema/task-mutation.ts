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
    const ret = {
      id: task.id,
      name: task.name,
      description: task.description,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
    return ret;
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
    const doc = await TaskModel.findOne({
      _id: input.id,
    });

    if (!doc) throw new Error('Not found');

    doc.name = input.name;
    doc.description = input.description;
    await doc.save();
    const ret = {
      id: doc.id,
      name: doc.name,
      description: doc.description,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
    return ret;
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
    const doc = await TaskModel.findOne({
      _id: id,
    });

    if (!doc) throw new Error('Not found');

    await TaskModel.deleteOne({
      _id: doc.id,
    });

    return id;
  },
};

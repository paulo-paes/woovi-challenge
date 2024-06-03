import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import {
  createTaskInputType,
  taskType,
  updateTaskInputType,
} from './task-type';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';

export const createTask: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(taskType),
  args: {
    input: {
      type: new GraphQLNonNull(createTaskInputType),
    },
  },
  resolve: async (a, { input }) => {
    const doc = new TaskModel();
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

export const updateTask: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(taskType),
  args: {
    input: {
      type: new GraphQLNonNull(updateTaskInputType),
    },
  },
  resolve: async (a, { input }) => {
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

export const deleteTask: GraphQLFieldConfig<any, any> = {
  type: GraphQLString,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (a, { id }) => {
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

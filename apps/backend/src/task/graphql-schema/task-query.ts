import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLString,
} from 'graphql';
import { App } from '../../app';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';
import { taskType } from './task-type';

export const taskQuery: GraphQLFieldConfig<void, any> = {
  type: new GraphQLNonNull(new GraphQLList(taskType)),
  description: 'fetchs a list of tasks',
  resolve: async () => {
    const tasks = await TaskModel.find();
    App.log.debug('tasks fetched ' + tasks);
    return tasks;
  },
};

export const taskById: GraphQLFieldConfig<void, any, { id: string }> = {
  type: new GraphQLNonNull(taskType),
  description: 'fetch a task by its id',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id }) => {
    return TaskModel.findById(id);
  },
};

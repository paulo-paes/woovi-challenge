import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLString,
  GraphQLError,
} from 'graphql';
import { App } from '../../app';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';
import { taskType } from './task-type';
import { GlobalContext } from '../../schema/global-context';

export const taskQuery: GraphQLFieldConfig<void, GlobalContext, void> = {
  type: new GraphQLNonNull(new GraphQLList(taskType)),
  description: 'fetchs a list of tasks',
  resolve: async (source, args, context) => {
    if (!context.user) {
      throw new GraphQLError('User not authenticated');
    }
    const tasks = await TaskModel.find({ user: context.user.id });
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

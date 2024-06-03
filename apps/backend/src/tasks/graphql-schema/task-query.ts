import { GraphQLList, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';
import { App } from '../../app';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';
import { taskType } from './task-type';

export const taskQuery: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(new GraphQLList(taskType)),
  description: 'fetchs a list of tasks',
  resolve: async () => {
    const tasks = await TaskModel.find();
    App.log.debug('tasks fetched ' + tasks);
    return tasks;
  },
};

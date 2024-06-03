import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLString,
  GraphQLError,
} from 'graphql';
import { App } from '../../../app';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';
import { taskType } from './task-type';
import { GlobalContext } from '../../../schema/global-context';
import { authValidator } from '../../../auth/auth-validator';

export const tasks: GraphQLFieldConfig<void, GlobalContext, void> = {
  type: new GraphQLList(taskType),
  description: 'fetchs a list of tasks',
  resolve: authValidator(
    async (source: void, args: void, context: GlobalContext) => {
      return TaskModel.find({ user: context.user!.id });
    },
  ),
};

export const taskById: GraphQLFieldConfig<void, GlobalContext, { id: string }> =
  {
    type: taskType,
    description: 'fetch a task by its id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: authValidator(
      async (_: void, { id }: { id: string }, context: GlobalContext) => {
        return TaskModel.findOne({ _id: id, user: context.user!.id });
      },
    ),
  };

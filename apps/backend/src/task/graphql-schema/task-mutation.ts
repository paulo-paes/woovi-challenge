import {
  GraphQLError,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { CreateTaskInput, UpdateTaskInput, taskType } from './task-type';
import { TaskModel } from '../mongoose-schema/task-mongoose-schema';
import { GlobalContext } from '../../schema/global-context';
import { authValidator } from '../../auth/auth-validator';

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
  resolve: authValidator(
    async (_: void, input: CreateTaskInput, context: GlobalContext) => {
      const task = new TaskModel();
      task.name = input.name;
      task.description = input.description;
      task.user = context.user!;
      await task.save();
      return task;
    },
  ),
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
  resolve: authValidator(
    async (_: void, input: UpdateTaskInput, context: GlobalContext) => {
      const task = await TaskModel.findOne({
        _id: input.id,
        user: context.user,
      });

      if (!task) throw new GraphQLError('Not found');

      task.name = input.name;
      task.description = input.description;
      await task.save();
      return task;
    },
  ),
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
  resolve: authValidator(
    async (_: void, { id }: { id: string }, context: GlobalContext) => {
      const task = await TaskModel.findOne({
        _id: id,
        user: context.user,
      });

      if (!task) throw new GraphQLError('Not found');

      await TaskModel.deleteOne({
        _id: task.id,
      });

      return id;
    },
  ),
};

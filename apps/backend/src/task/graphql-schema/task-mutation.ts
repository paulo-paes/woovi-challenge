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
import { CategoryModel } from '../../category/mongoose-schema/category-mongoose-schema';

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
    categoryId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: authValidator(
    async (_: void, args: CreateTaskInput, context: GlobalContext) => {
      const task = new TaskModel();
      const category = await CategoryModel.findOne({
        _id: args.categoryId,
        user: context.user,
      });

      if (!category) {
        throw new GraphQLError('category not found');
      }

      task.name = args.name;
      task.description = args.description;
      task.user = context.user!;
      task.category = category;
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
    async (_: void, args: UpdateTaskInput, context: GlobalContext) => {
      const task = await TaskModel.findOne({
        _id: args.id,
        user: context.user,
      });

      if (!task) throw new GraphQLError('Not found');

      task.name = args.name;
      task.description = args.description;
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

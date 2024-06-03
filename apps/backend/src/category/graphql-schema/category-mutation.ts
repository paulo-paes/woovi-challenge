import {
  GraphQLError,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { UpdateCategoryInput, categoryType } from './category-type';
import { CategoryModel } from '../mongoose-schema/category-mongoose-schema';
import { authValidator } from '../../auth/auth-validator';
import { GlobalContext } from '../../schema/global-context';

export const createCategory: GraphQLFieldConfig<
  void,
  GlobalContext,
  { name: string }
> = {
  type: new GraphQLNonNull(categoryType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: authValidator(
    async (_: void, { name }: { name: string }, context: GlobalContext) => {
      const category = new CategoryModel();
      category.name = name;
      category.user = context.user!;
      await category.save();
      return category;
    },
  ),
};

export const updateCategory: GraphQLFieldConfig<
  void,
  GlobalContext,
  UpdateCategoryInput
> = {
  type: new GraphQLNonNull(categoryType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: authValidator(
    async (_: void, input: UpdateCategoryInput, context: GlobalContext) => {
      const category = await CategoryModel.findOne({
        _id: input.id,
        user: context.user,
      });

      if (!category) throw new GraphQLError('Not found');

      category.name = input.name;
      await category.save();
      return category;
    },
  ),
};

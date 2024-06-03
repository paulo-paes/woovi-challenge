import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { CategoryModel } from '../mongoose-schema/category-mongoose-schema';
import { App } from '../../app';
import { categoryType } from './category-type';
import { authValidator } from '../../auth/auth-validator';
import { GlobalContext } from '../../schema/global-context';

export const categoryQuery: GraphQLFieldConfig<void, GlobalContext> = {
  type: new GraphQLNonNull(new GraphQLList(categoryType)),
  description: 'fetchs a list of categories',
  resolve: authValidator(async (_: void, __: void, context: GlobalContext) => {
    return CategoryModel.find({
      user: context.user,
    });
  }),
};

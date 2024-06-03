import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { categoryType } from './category-type';
import { CategoryModel } from '../mongoose-schema/category-mongoose-schema';

export const createCategory: GraphQLFieldConfig<void, any, { name: string }> = {
  type: new GraphQLNonNull(categoryType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { name }) => {
    const category = new CategoryModel();
    category.name = name;
    await category.save();
    const ret = {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };
    return ret;
  },
};

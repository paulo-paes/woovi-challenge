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
    return category;
  },
};

export const updateCategory: GraphQLFieldConfig<
  void,
  any,
  { id: string; name: string }
> = {
  type: new GraphQLNonNull(categoryType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, { id, name }) => {
    const category = await CategoryModel.findById(id);

    if (!category) throw new Error('Not found');

    category.name = name;
    await category.save();
    return category;
  },
};

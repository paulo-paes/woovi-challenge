import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import { categoryType } from "./category-type";
import { CategoryModel } from '../mongoose-schema/category-mongoose-schema';

export const createCategory: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(categoryType),
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (a, { name }) => {
    const doc = new CategoryModel();
    doc.name = name;
    await doc.save();
    const ret = {
      id: doc.id,
      name: doc.name,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    };
    return ret;
  },
};
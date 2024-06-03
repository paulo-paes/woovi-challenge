import { GraphQLObjectType, GraphQLString } from 'graphql';
import { CategoryDocument } from '../mongoose-schema/category-mongoose-schema';

export const categoryType = new GraphQLObjectType<CategoryDocument>({
  name: 'Category',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (category) => category.id,
    },
    name: {
      type: GraphQLString,
      resolve: (category) => category.name,
    },
    createdAt: {
      type: GraphQLString,
      description: 'created date in ISO format',
      resolve: (category) => category.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      description: 'last updated date in ISO format',
      resolve: (category) => category.updatedAt.toISOString(),
    },
  }),
});

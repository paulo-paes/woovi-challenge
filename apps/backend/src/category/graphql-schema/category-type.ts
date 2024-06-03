import { GraphQLObjectType, GraphQLString } from 'graphql';

export const categoryType = new GraphQLObjectType<any>({
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
      resolve: (category) => category.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      description: 'last updated date in ISO format',
      resolve: (category) => category.updatedAt,
    },
  }),
});

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  token: string;
}

export const authPayload = new GraphQLObjectType<LoginOutput>({
  name: 'AuthPayload',
  fields: () => ({
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (payload) => payload.token,
    },
  }),
});
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UserDocument } from '../mongoose-schema/user-mongoose-schema';

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

export const meType = new GraphQLObjectType<UserDocument>({
  name: 'Me',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.name,
    },
  }),
});

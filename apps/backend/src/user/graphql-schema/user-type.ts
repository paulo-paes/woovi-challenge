import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

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


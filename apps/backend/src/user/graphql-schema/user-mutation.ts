import {
  GraphQLField,
  GraphQLFieldConfig,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UserModel } from '../mongoose-schema/user-mongoose-schema';
import {
  LoginInput,
  LoginOutput,
  RegisterUserInput,
} from './user-type';

export const registerUser: GraphQLFieldConfig<
  void,
  any,
  RegisterUserInput
> = {
  type: GraphQLString,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, input) => {
    const user = new UserModel();
    user.name = input.name;
    user.email = input.email;
    user.password = input.password;
    await user.save();
    return 'OK';
  },
};

export const authPayload = new GraphQLObjectType<LoginOutput>({
  name: 'AuthPayload',
  fields: () => ({
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (payload) => payload.token,
    },
  }),
});

export const login: GraphQLFieldConfig<void, any, LoginInput> = {
  type: authPayload,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_, input) => {
    const user = await UserModel.findOne({ email: input.email });
    if (!user) throw new Error('email or password invalid!');

    if (user.password === input.password) {
      const token = '123';
      return { token };
    }

    throw new Error('email or password invalid!');
  },
};

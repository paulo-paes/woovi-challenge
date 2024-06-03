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
  authPayload,
} from './user-type';
import { comparePassword, hashPassword } from '../../utils/hasher';
import { sign } from '../../utils/jwt-utils';

export const registerUser: GraphQLFieldConfig<void, any, RegisterUserInput> = {
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
    user.password = await hashPassword(input.password);
    await user.save();
    return 'OK';
  },
};

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

    const validPassword = await comparePassword(user.password, input.password);
    if (validPassword) {
      const token = sign(user.id);
      return { token };
    }

    throw new Error('email or password invalid!');
  },
};

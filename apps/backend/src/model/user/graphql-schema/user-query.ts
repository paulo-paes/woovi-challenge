import { GraphQLFieldConfig } from 'graphql';
import { GlobalContext } from '../../../schema/global-context';
import { meType } from './user-type';
import { authValidator } from '../../../auth/auth-validator';

export const me: GraphQLFieldConfig<void, GlobalContext, void> = {
  type: meType,
  description: 'fetchs a list of tasks',
  resolve: authValidator(async (source: void, args: void, context: GlobalContext) => {
    return {
      name: context.user!.name
    };
  }),
};

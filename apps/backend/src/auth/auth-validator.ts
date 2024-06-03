import { GraphQLError } from 'graphql';
import { GlobalContext } from '../schema/global-context';

export const authValidator = (resolver: Function) => {
  return (source: any, args: any, context: GlobalContext) => {
    if (!context.user) {
      throw new GraphQLError('user not authenticated');
    }
    return resolver(source, args, context);
  };
};

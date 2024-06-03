import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { CategoryModel } from '../mongoose-schema/category-mongoose-schema';
import { App } from '../../app';
import { categoryType } from './category-type';

export const categoryQuery: GraphQLFieldConfig<void, any> = {
  type: new GraphQLNonNull(new GraphQLList(categoryType)),
  description: 'fetchs a list of categories',
  resolve: async () => {
    const categories = await CategoryModel.find();
    App.log.debug('categories fetched ' + categories);
    return categories;
  },
};

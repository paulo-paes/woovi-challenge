import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { schema } from './schema/schema';
import { Context } from 'koa';
import { GlobalContext } from './schema/global-context';

export class AppController {
  public async handle(ctx: Context) {
    const request = {
      body: ctx.request.body,
      headers: ctx.request.headers,
      method: ctx.request.method,
      query: ctx.request.query,
    };

    if (shouldRenderGraphiQL(request)) {
      ctx.response.body = renderGraphiQL({
        endpoint: '/',
      });
    } else {
      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest<GlobalContext>({
        operationName,
        query,
        variables,
        request,
        schema,
        contextFactory: () => ({ user: ctx.user }),
      });

      sendResult(result, ctx.res);
    }
  }
}

import { Context, Next } from 'koa';
import { verify } from '../utils/jwt-utils';
import { UserModel } from '../model/user/mongoose-schema/user-mongoose-schema';

export class AuthMiddleware {
  async handle(ctx: Context, next: Next) {
    const authorization = ctx.headers.authorization

    if (!authorization?.length) {
      return next()
    }

    const token = authorization.replace('Bearer ', '')

    const payload = verify(token)

    if (!payload) {
      return next()
    }

    ctx.user = await UserModel.findById(payload.sub!)
    return next()
  }
}

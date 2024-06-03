import Router from 'koa-router';
import { AppController } from './app-controller';
import { AuthMiddleware } from './middleware/auth-middleware';

export const routes = () => {
  const router = new Router();
  const controller = new AppController();
  const authMiddleware = new AuthMiddleware();
  router.use(authMiddleware.handle.bind(authMiddleware));
  router.all('/', controller.handle.bind(controller));

  return router.routes();
};

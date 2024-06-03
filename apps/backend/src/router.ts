import Router from 'koa-router';
import { AppController } from './app-controller';

export const routes = () => {
  const router = new Router();
  const controller = new AppController();
  router.all('/', controller.handle.bind(controller));

  return router.routes();
};

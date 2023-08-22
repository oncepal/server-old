
import Router from '@koa/router';
import config from '../config';
import { useUserRouter } from './user';
console.log(Router);

const router = new Router();
const { DEBUG, MOCK } = config.mode;
router.get('/', async (ctx, next) => {
  if (MOCK) {
    ctx.body = 'hello slight sweet';
  }

  if (DEBUG) {
  }
});

useUserRouter(router);

export default router;

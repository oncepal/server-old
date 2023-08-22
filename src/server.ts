import Koa from 'koa';
import router from './routers';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import config from './config';
import { responseGenerator } from './generators/response';

const SERVER_PORT = config.server.port;
const { DEBUG } = config.mode;



const server = new Koa();

/**
 * 设置跨域
 */
server.use(cors());
server.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

/**
 * 所有中间处理完成后，最后一步，进行res=>data的封装并返回数据。
 */
server.use(async (ctx, next) => {
  await next();
  ctx.body = responseGenerator()(ctx.body);

  console.log('请求log:', ctx);
});

/**
 * 接口报错的处理
 */
server.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.app.emit('error', err);
    ctx.body = 'server error';
    ctx.status = err.status || 500;
  }
});

server.use(bodyParser());

server.use(router.routes()).use(router.allowedMethods());


server.listen(SERVER_PORT, () => {
  console.info('Server listening on port: ' + SERVER_PORT + (DEBUG?', with debug mode':''));
});

export default server;

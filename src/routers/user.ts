import config from '../config';
import type { User, UserFilter } from '../generators/user';
import { userGenerator } from '../generators/user';
import { DefaultState, DefaultContext } from 'koa';
import Router from '@koa/router';
import { connectToMongoDBCollection } from '../db';
const { DEBUG, MOCK } = config.mode;

/**
 * 方法体，包含用户所有的接口
 */
export const useUserRouter = (router: Router<DefaultState, DefaultContext>) => {

  /**
   * 获取用户列表
   * @param body:UserFilter
   * @method POST
   * @return 用户列表:User[]
   */
  router.post<{}, { request: { body: UserFilter } }>('/getUserList', async (ctx, next) => {
    const {
      revenue,
      weight,
      height,
      education,
      smoking,
      drinking,
      career,
      marriage,
      ethnicity,
      house,
      car,
      sex,
      birthday,
      age,
      habitation,
      home,
      vx,
      phone,
      hc,
    } = ctx.request.body;
    if (MOCK) {
      ctx.body = [userGenerator(), userGenerator(), userGenerator()];
    } else {
      if (DEBUG) console.log();


      // 盲盒

      // const x = parseInt(Math.random() *  result.length)
      // ctx.body = result;
    }
  });

  /**
   * 获取单个用户信息
   * @param id:string|number
   * @method GET
   * @return 用户信息:User
   */
  router.get('/getUserById/:id', async (ctx, next) => {
    const { id } = ctx.params;
    if (MOCK) {
      ctx.body = userGenerator({ id });
    } else {
      if (DEBUG) console.log();
      const result = await ctx.db.collection('users').findOne({ _id: id });
      ctx.body = result;
    }
  });

  /**
   * 新增或编辑用户信息
   * @param body:User
   * @method POST
   * @return 更新后的用户信息:Response<User>
   */
  router.post<{}, { request: { body: User } }>('/createOrUpdateUser', async (ctx, next) => {
    const userInfo = ctx.request.body
    if (MOCK) {
      ctx.body = `${'id' in userInfo ? '更新' : '新建'}用户信息成功`;
    } else {
      if (DEBUG) console.log('新增或编辑用户信息');
      let result;
      const user = userGenerator(userInfo);
      const [collection,mongoClient] = await connectToMongoDBCollection<User>('user',"slightsweet")
      if ('id' in user) result = await collection.updateOne((v: User) => v.id == user.id, user);
      else result = await collection.insertOne(user);
      await mongoClient?.close();
      ctx.body = result;
    }
  });

  /**
   * 删除用户信息
   * @param body:{ id: string | number }
   * @method POST0
   * @return Response<{ id }>
   */
  router.post<{}, { request: { body: { id: string | number } } }>('/deleteUser', async (ctx, next) => {
    const { id } = ctx.request.body;

    if (MOCK) {
      ctx.body = `删除用户${id}成功`;
    } else {
      if (DEBUG) console.log();
      const result = await ctx.db.collection('users').deleteOne((v: User) => v.id == id);
      ctx.body = {};
    }
  });
};

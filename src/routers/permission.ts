import config from '../config';
import type { Permissions } from '../generators/permission';
import { permissionsGenerator } from '../generators/permission';
import { DefaultState, DefaultContext } from 'koa';
import Router from '@koa/router';
const { DEBUG, MOCK } = config.mode;
export const usePermissionsRouter = (router: Router<DefaultState, DefaultContext>) => {
  /**
   * 获取用户权限信息
   * @method GET
   * @return 用户权限信息:Permissions
   */
  router.get('/getPermissions/:userId', async (ctx, next) => {
    if (MOCK) {
      ctx.body = permissionsGenerator();
    } else {
      if (DEBUG) console.log();
      const result = await ctx.db.collection('permission').find().toArray();
      ctx.body = result;
    }
  });

  /**
   * 新增或更新权限信息
   * @param permissions:Permissions
   * @method POST
   * @return 更新后的权限信息:Response<Permissions>
   */
  router.post<{}, { request: { body: Permissions } }>('/createOrUpdatePermissions', async (ctx, next) => {
    const permissions = ctx.request.body;
    if (MOCK) {
      ctx.body = `${'id' in permissions ? '更新' : '新建'}权限信息成功`;
    } else {
      if (DEBUG) console.log();
      let result;
      if ('id' in permissions)
        result = await ctx.db
          .collection('permission')
          .updateOne((v: Permissions) => v.id == permissions.id, permissions);
      else result = await ctx.db.collection('permission').insertOne(permissions);
      ctx.body = result;
    }
  });

  /**
   * 删除权限信息
   * @param userId:string
   * @method POST
   * @return Response<{ id }>
   */
  router.post<{}, { request: { body: { userId: string | number } } }>('/deletePermissions', async (ctx, next) => {
    const { userId } = ctx.request.body;

    if (MOCK) {
      ctx.body = `删除用户${userId}成功`;
    } else {
      if (DEBUG) console.log();
      const result = await ctx.db.collection('permission').deleteOne((v: Permissions) => v.id == userId);
      ctx.body = result;
    }
  });
};

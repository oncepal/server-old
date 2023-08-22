/**
 * 权限模型
 * @param userId 用户唯一id
 * @param id 权限唯一id
 * @param viewPhoto 可查看照片
 * @param matchmakingService 红娘专属服务
 * @param searchFirst 搜索优先展示
 * @param matchFirst 匹配优先
 * @param vip 0-无 1-银卡(解锁权限) 2-金卡(公众号和朋友圈挂+VIP征婚交友群) 3-钻石卡(+抖音小红书推荐+各种次数+专属恋爱咨询)
 * @param endTime 到期时间 2043-08-09
 * @param startTime 开始时间 2023-08-09
 */
export type Permissions = {
  id?: string;
  userId: string;
  viewPhoto: boolean;
  vip: number;
  matchmakingService: boolean;
  searchFirst: boolean;
  matchFirst: boolean;
};

export const defaultPermissions: Permissions = {
  viewPhoto: false,
  matchmakingService: false,
  searchFirst: false,
  matchFirst: false,
  userId: '0',
  vip: 0,
};

export const permissionsGenerator = (permissions?: Partial<Permissions>) => {
  return {
    ...defaultPermissions,
    ...permissions,
  };
};

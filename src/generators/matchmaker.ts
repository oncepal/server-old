/**
 * 红娘模型
 * @param id 红娘唯一id
 * @param name 红娘真实姓名
 * @param nickName 红娘昵称
 * @param vx 微信号 SylasXu
 * @param phone 手机号 13996092354
 * @param introduction 自我介绍
 */
export type Matchmaker = {
  id?: string;
  name: string;
  nickName: string;
  vx: string;
  phone: string;
  introduction: string;
};

export const defaultMatchmaker: Matchmaker = {
  name: '',
  nickName: '',
  vx: '',
  phone: '',
  introduction: '',
};

export const MatchmakerGenerator = (Matchmaker?: Partial<Matchmaker>) => {
  return {
    ...defaultMatchmaker,
    ...Matchmaker,
  };
};

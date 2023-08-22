/**
 * 通用响应模型
 * @param code 自定义响应code
 * @param msg 自定义响应信息
 * @param data 响应数据
 */
export type Response<T> = {
  code: number;
  msg: string;
  data: T;
};

export const defaultResponse: Response<{}> = {
  code: 200,
  msg: '',
  data: {},
};

export const responseGenerator = <T>(msg: string = '', code: number = 200) => {
  const res = {
    ...defaultResponse,
    msg,
    code,
  };

  return (data?: T) => ({ ...res, data } as Response<T>);
};

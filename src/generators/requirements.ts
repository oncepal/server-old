/**
 * 择偶要求
 * @param age 年龄 26
 * @param weight 体重 70（kg）
 * @param height 身高 178
 * @param education 学历 0-初中 1-高中 2-大专 3-本科 4-硕士 5-博士
 * @param marriage 婚姻状况 0-未婚 1-离异未育 2-离异不带孩 3-离异带女 4-离异带男 -丧偶
 * @param career 职业 0-上班族 1-自由职业 2-在校生 3-求职中 4-个体户老板 5-事业单位 6-教师 7-护士 8-医生 9-服务业
 * @param revenue 收入 0-3k 1-3~5k 2-5~8k 3-8~10k 4-1~1.5w 5-1.5~2w 6--2~3w 7-3~4w 8-4w以上
 * @param house 购房情况 0-未购房  1-正在考虑购房  2-已购房有贷款 3-已购房无贷款 4-暂无购房能力
 * @param car 购车情况 0-未购车 1-已经购车 2-需要时购置
 * @param smoking 抽烟情况 0-不吸 1-偶尔 2-经常
 * @param residence 居住 0-不限 1-愿意和父母同住 2-要独立婚房
 * @param drinking 喝酒情况 0-不喝 1-偶尔 2-经常
 * @param remark 备注要求
 */
export type Requirements = {
    id:'',
    userId: '',
    remark?: string;
    weight?: number;
    height?: number;
    education?: number;
    career?: number;
    house?: number;
    car?: number;
    residence?: number;
    revenue?: number;
    smoking?: number;
    drinking?: number;
    marriage?: number;
  };

  export const defaultRequirements: Requirements = {
    id:'',
    userId: '',
  };
  
  export const userGenerator = (requirements?: Requirements) => {
    return {
      ...defaultRequirements,
      ...requirements,
    };
  };
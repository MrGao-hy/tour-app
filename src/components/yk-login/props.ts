export default {
  /**
   * 登录logo
   * */
  logo: "",
  /**
   * 登录类型：可选：1-用户密码登录、2-手机验证码登录、其他-两者都可以
   * */
  loginType: 0,
  /**
   * 主题颜色
   * */
  themeColor: "#20D56E",
  /**
   * 浏览器缓存名称前缀
   * */
  prefix: "gxh",
  /**
   * 是否需要显示密码操作
   * */
  isShowPwd: false,
  userPlaceholder: "输入您的用户名",
  pwdPlaceholder: "输入您的密码",
  /**
   * 底部小菜单
   * */
  menu: ["立即注册", "忘记密码？"],
  /**
   * 自定义用户名效验
   * customUserValidator: {
   *     validator: (rule, value, callback) => {
   *     },
   *     message: '提示信息',
   *     trigger: ['change','blur'],
   * }
   * */
  customUserValidator: () => ({}),
  /**
   * 自定义密码效验
   * */
  customPwdValidator: () => ({}),
  /**
   * 用户名输入数量校验
   * */
  userNumValidator: () => ({}),
  /**
   * 密码输入数量校验
   * */
  pwdNumValidator: () => ({
    min: 6,
    max: 20,
    message: "长度在6-20个字符之间",
    trigger: ["blur", "change"]
  }),
  /**
   * 自定义手机效验规则
   * */
  customPhoneValidator: () => ({
    // 自定义验证函数，见上说明
    validator: (rule, value, callback) => {
      // 上面有说，返回true表示校验通过，返回false表示不通过
      return /^[1][0-9]{10}$/.test(value);
    },
    message: "手机号码不正确",
    trigger: ["change", "blur"]
  })
};

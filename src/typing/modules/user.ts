export interface UserRegisterType {
	/**
	 * @description 用户名
	 * */
	userName: string;
	/**
	 * @description 密码
	 * */
	password: string;
	/**
	 * @description 手机号
	 * */
	phone: string;
}

export interface UserLoginType extends UserRegisterType {
	/**
	 * @description 验证码
	 * */
	code: string;
	/**
	 * @description 唯一id
	 * */
	uuid: string;
}

export interface UserInfoType {
	/**
	 * id
	 * */
	id: string;
	/**
	 * 用户名
	 * */
	userName: string;
	/**
	 * 头像
	 * */
	avatar: string;
	/**
	 * 手机号
	 * */
	phone: string;
	/**
	 * 性别
	 * */
	sex: string;
}

export interface UserType extends UserInfoType {
	/**
	 * 用户密码
	 * */
	password: string;
	/**
	 * 出生日期
	 * */
	birthDate: string;
	/**
	 * 星座
	 * */
	constellation: string;
	/**
	 * 邮箱
	 * */
	emit: string;
	/**
	 * 签名
	 * */
	signature: string;
	/**
	 * 权限
	 * */
	roles?: RoleType[];
}

export interface RoleType {
	/**
	 * 权限id
	 * */
	id: string;
	/**
	 * 权限字段值
	 * */
	value: string;
	/**
	 * 权限字段名
	 * */
	label: string;
}

export interface LoginResultType {
	/**
	 * 登录密钥
	 * */
	token: string;
}

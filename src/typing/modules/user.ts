export interface RegisterUserType {
	userName: string;
	password: string;
	phone: string;
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
}

export interface LoginType {
	/**
	 * 登录密钥
	 * */
	token: string;
}

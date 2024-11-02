export interface UserInfoType {
	id: string;
	userName: string;
	avatar: string;
	phone: string;
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
	 * 性别
	 * */
	sex: string;
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

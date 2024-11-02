import http from "../http";
import { LoginType, UserType } from "@/typing";

/**
 * 用户注册
 * @param {UserInfoType} data 用户信息
 * @return
 */
export const registerUserApi = (data: UserType): Promise<null> => {
	return http.post("user/register", data);
};

/**
 * 用户名登录
 * @param userName 用户名
 * @param password 密码
 * @return token
 */
export const userLoginApi = (
	userName: string,
	password: string
): Promise<LoginType> => {
	return http.post("user/login", {
		userName,
		password,
	});
};

/**
 * 查询用户信息
 * @param id 用户id不传查自己信息
 */
export const userInfoApi = (id = ""): Promise<UserType> => {
	return http.post("user/info", {
		id,
	});
};

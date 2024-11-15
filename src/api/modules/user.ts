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

/**
 * 注销账号
 * @return
 */
export const unsubscribeApi = (password: string): Promise<null> => {
	return http.post("user/unsubscribe", {
		password,
	});
};

/**
 * 更新用户信息
 * @param params 信息集合
 * @return
 */
export const updateUserInfoApi = (params: UserType): Promise<null> => {
	return http.post("user/editInfo", params);
};

/**
 * 修改密码
 * @param oldPassword 旧密码
 * @param password 新密码
 * */
export const editPasswordApi = (
	oldPassword: string,
	password: string
): Promise<null> => {
	return http.post("/user/change/password", {
		oldPassword,
		password,
	});
};

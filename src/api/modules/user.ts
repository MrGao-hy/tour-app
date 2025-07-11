import http from "@/api/http";
import {
	AddressVo,
	LoginResultType,
	UserRegisterType,
	UserType,
	UserLoginType,
} from "@/typing";

/**
 * @description 用户注册
 * @param {UserRegisterType} data 用户信息
 * @return
 */
export const registerUserApi = (data: UserRegisterType): Promise<null> => {
	return http.post("user/register", data);
};

/**
 * @description 获取验证码
 * @param {UserLoginType} data 用户信息
 * @return
 */
export const getLoginCodeApi = (
	data: Partial<UserLoginType>
): Promise<string> => {
	return http.post("user/login/verifyCode", data);
};

/**
 * @description 用户名登录
 * @param {UserLoginType} data 登录集合
 * @return token
 */
export const userLoginApi = (data: UserLoginType): Promise<LoginResultType> => {
	return http.post("user/login", data);
};

/**
 * @description 查询用户信息
 * @param id 用户id不传查自己信息
 */
export const userInfoApi = (id = ""): Promise<UserType> => {
	return http.post("user/info", {
		id,
	});
};

/**
 * @description 注销账号
 * @return
 */
export const unsubscribeApi = (password: string): Promise<null> => {
	return http.post("user/unsubscribe", {
		password,
	});
};

/**
 * @description 更新用户信息
 * @param params 信息集合
 * @return
 */
export const updateUserInfoApi = (params: UserType): Promise<null> => {
	return http.post("user/editInfo", params);
};

/**
 * @description 修改密码
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

/**
 * @description 获取用户ip地址
 * @return
 */
export const getUserIpApi = (): Promise<any> => {
	return http.get("/request/constellation", {
		params: {
			type: "scorpio",
			date: "today",
		},
	});
};

/**
 * @description 获取默认地址
 * */
export const getDefaultAddressApi = (): Promise<AddressVo> => {
	return http.post("/shippingAddress/default");
};

/**
 * @description 保存地址
 * @param params 参数
 * */
export const saveAddressApi = (params: AddressVo) => {
	return http.post("/shippingAddress/create", params);
};

/**
 * @description 我的地址列表
 * */
export const queryAddressListApi = (): Promise<AddressVo[]> => {
	return http.post("/shippingAddress/list");
};

/**
 * @description 获取默认地址
 * @param id 地址id
 * */
export const queryOneAddressApi = (id: string): Promise<AddressVo> => {
	return http.post("/shippingAddress/detail", {
		id,
	});
};

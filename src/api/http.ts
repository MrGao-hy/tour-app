import axios from "axios";

import { getFullURL } from "@/utils/http";
import { useUserStore } from "@/store";
import conf from "@/config/env";
import { config } from "@/config";

const instance = axios.create({
	// #ifdef H5
	baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
	// #endif
	// #ifndef H5
	// @ts-ignore
	baseURL: conf.baseUrl,
	// #endif
	adapter(config) {
		// console.log("request adapter ↓↓");
		// console.log(config);
		const { url, method, data, params, headers, baseURL, paramsSerializer } =
			config;
		return new Promise((resolve, reject) => {
			uni.request({
				method: method!.toUpperCase() as any,
				url: getFullURL(baseURL || "", url!, params, paramsSerializer),
				header: headers,
				data,
				dataType: "json",
				responseType: config.responseType,
				success: (res: any) => {
					// console.log("request success ↓↓");
					// console.log(res);
					resolve(res);
				},
				fail: (err: any) => {
					reject(err);
				},
			});
		});
	},
});

/**
 * 请求拦截
 */
instance.interceptors.request.use((confer) => {
	const { method, params } = confer;
	// 附带鉴权的token
	const headers: any = {
		Authorization: uni.getStorageSync(`${config.prefix}token`),
	};
	// 不缓存get请求
	if (method === "get") {
		headers["Cache-Control"] = "no-cache";
	}
	// delete请求参数放入body中
	if (method === "delete") {
		headers["Content-type"] = "application/json;";
		Object.assign(confer, {
			data: params,
			params: {},
		});
	}

	return {
		...confer,
		headers,
	};
});

/**
 * 响应拦截
 */
instance.interceptors.response.use(
	(v) => {
		const { data, statusCode, status } = v;
		const userStore = useUserStore();

		if (statusCode !== 200) {
			userStore.promptMessage("服务请求超时, 请稍后重试!", "error");
		}
		if ((status || statusCode) === 200) {
			const errorCode = [
				40001, 40002, 40003, 40004, 40005, 40006, 40007, 50000, 50001, 50002,
			];
			const warningCode = [20001, 20002, 20003, 20005, 20006, 20012];
			if (errorCode.includes(data.code)) {
				userStore.outLogin(data.code, data.message);
				return Promise.reject(v);
			} else if (warningCode.includes(data.code)) {
				userStore.promptMessage(data.message);
				return Promise.reject(v);
			}
			// uni.$u.toast(data.message);
			if (data.code === 2000) {
				return data;
			} else {
				return data.data;
			}
		}
		// alert(v.statusText, '网络错误')
		return Promise.reject(v);
	},
	(error) => {
		const userStore = useUserStore();
		userStore.promptMessage("网络问题:" + error.errMsg, "error");
	}
);

export default instance;

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
			uni.showModal({
				title: "服务请求超时, 请稍后重试",
				showCancel: false,
				success: () => {},
			});
		}
		if ((status || statusCode) === 200) {
			const blacklist = [
				20001, 20002, 20005, 40001, 40002, 40003, 40004, 40005, 40006, 50001,
			];
			const isIntercept = blacklist.includes(data.code);
			if (isIntercept) {
				userStore.outLogin(data.code, data.message);
				return Promise.reject(v);
			}
			// uni.$u.toast(data.message);
			return data.data;
		}
		// alert(v.statusText, '网络错误')
		return Promise.reject(v);
	},
	(error) => {
		uni
			.showModal({
				title: "网络问题:" + error.errMsg,
				showCancel: false,
			})
			.then();
	}
);

export default instance;

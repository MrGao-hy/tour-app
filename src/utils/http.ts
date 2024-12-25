import type { AxiosRequestConfig } from "axios";
import { queryParams } from "uview-plus";

type ParamsSerializer = AxiosRequestConfig["paramsSerializer"];
function buildURL(
	url: string,
	params?: Record<string, any>,
	paramsSerializer?: any
) {
	if (params) {
		return url + queryParams(params);
	}
	return url;
}

export function getFullURL(
	baseURL: string,
	url: string,
	params?: Record<string, any>,
	paramsSerializer?: ParamsSerializer
) {
	if (url.startsWith("http")) {
		return buildURL(url, params, paramsSerializer);
	}
	baseURL = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
	url = url.startsWith("/") ? url.slice(1) : url;
	return buildURL(`${baseURL}${url}`, params, paramsSerializer);
}

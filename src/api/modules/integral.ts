import http from "@/api/http";
import { IntegralType, PageConfigType } from "@/typing";

/**
 * @description 积分兑换记录
 * @param current 当前页
 * @param size 页数
 * */
export const getIntegralRecordApi = (
	current: number,
	size: number
): Promise<PageConfigType<IntegralType>> => {
	return http.get("/integralRecord/list", {
		params: {
			current,
			size,
		},
	});
};

/**
 * @description 获取我的总积分
 * */
export const getMyIntegralTotalApi = (): Promise<number> => {
	return http.get("/integralRecord/my/total");
};

/**
 * @description 获取今天获取积分数量
 * */
export const getTodayIntegralCountApi = (): Promise<number> => {
	return http.get("/integralRecord/today/count");
};

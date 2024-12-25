import http from "@/api/http";

interface MatterType {
	/**
	 * 问题归类
	 * */
	type: string;
	/**
	 * 问题描述
	 * */
	problemDescription: string;
	/**
	 * 联系方式
	 * */
	contactWay: string;
}
/**
 * app问题提交
 * */
export const matterApi = (data: MatterType) => {
	return http.post("/problemInfo/submit", data);
};

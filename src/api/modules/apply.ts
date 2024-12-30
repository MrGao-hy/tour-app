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

/**
 * 获取美女图片背景图
 * */
export const getBgImageApi = () => {
	return http.get("/request/poster/bg");
};

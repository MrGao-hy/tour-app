import http from "@/api/http";
import { MatterType } from "@/typing";
/**
 * @description app问题提交
 * */
export const matterApi = (data: MatterType) => {
	return http.post("/problemInfo/submit", data);
};

/**
 * @description 获取美女图片背景图
 * */
export const getBgImageApi = () => {
	return http.get("/request/poster/bg");
};

/**
 * @description 获取轮播图
 * */
export const getSwiperListApi = (): Promise<string[]> => {
	return http.get("/request/swiper");
};

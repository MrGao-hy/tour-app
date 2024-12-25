import http from "@/api/http";
import { MountType, PageConfigType, PageConfigVo } from "@/typing";

/**
 * 查询景区是否收藏
 * @param mountId 景区id
 * */
export const queryMountIsCollectApi = (mountId: string): Promise<boolean> => {
	return http.post("/collect/isNo", {
		mountId,
	});
};

/**
 * 收藏景区
 * @param mountId 景区id
 * */
export const collectMountApi = (mountId: string): Promise<boolean> => {
	return http.post("/collect/mount", {
		mountId,
	});
};

/**
 * 我的收藏景区
 * */
export const collectMountListApi = (
	data: PageConfigVo
): Promise<PageConfigType<MountType>> => {
	return http.post("/collect/mount/list", data);
};

import http from "../http";
import { MountType, PageConfigType, PageConfigVo } from "@/typing";

/**
 * 查询景区列表
 * */
export const queryMountListApi = (
	data: PageConfigVo
): Promise<PageConfigType<MountType[]>> => {
	return http.post("mount/query/list", data);
};

/**
 * 查询景区详情
 * */
export const queryMountDetailApi = (id: string): Promise<MountType> => {
	return http.post("mount/query/detail", {
		id,
	});
};

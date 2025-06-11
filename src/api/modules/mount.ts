import http from "@/api/http";
import {
	ApiVo,
	MountType,
	PageConfigType,
	PageConfigVo,
	PunchRecordType,
} from "@/typing";

/**
 * 查询景区列表
 * */
export const queryMountListApi = (
	data: PageConfigVo
): Promise<PageConfigType<MountType>> => {
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

/**
 * 生成分享二维码
 * */
export const createShareQrCodeApi = async (
	id: string,
	path: string
): Promise<{ base64: string }> => {
	return http.get("/wechat/qrcode", {
		params: {
			id,
			path,
		},
	});
};

/**
 * 景区打卡接口
 * */
export const recordTravelApi = async (
	data: PunchRecordType
): Promise<{ base64: string }> => {
	return http.post("/mountainRecord/punch", data);
};

/**
 * 打卡足迹列表接口
 * */
export const travelListApi = async (
	data: PageConfigVo
): Promise<PageConfigType<MountType>> => {
	return http.post("/mountainRecord/record/list", data);
};

/**
 * @description 热门景区
 * */
export const hotMountListApi = async (): Promise<MountType[]> => {
	return http.post("/mount/query/hot");
};

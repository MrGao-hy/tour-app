import http from "@/api/http";
import { ApiVo, DiaryType, DiaryVo } from "@/typing";

/**
 * 保存日记
 * */
export const saveDiaryApi = (diary: DiaryVo): Promise<ApiVo<null>> => {
	return http.post("/diaryText/save", diary);
};

/**
 * 查看日记详情
 * */
export const queryDiaryContentApi = (
	createDate: string
): Promise<DiaryType | null> => {
	return http.post("/diaryText/detail", {
		createDate,
	});
};

/**
 * 查看个人所以日记
 * @param createDate 查询当前月
 * @returns ['2022-12-12']
 * */
export const queryDiaryListApi = (createDate: string): Promise<string[]> => {
	return http.post("/diaryText/month/list", {
		createDate,
	});
};

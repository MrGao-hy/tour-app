import http from "@/api/http";
import { SongInfoType } from "@/typing";

/**
 * @description 网易云热门歌单分类
 * */
export const getMusicHotClassApi = () => {
	return http.get("/music/hot/class");
};

/**
 * @description 网易云精品歌单分类
 * */
export const getMusicClassApi = () => {
	return http.get("/music/quality/class");
};

/**
 * @description 网易云排行榜分类
 * */
export const getRankingClassApi = () => {
	return http.get("/music/ranking/class");
};

/**
 * @description 歌单列表
 * @param id id
 * @param current 页码
 * @param size 页数
 * */
export const querySongListApi = (
	id: number,
	current: number,
	size: number
): Promise<any[]> => {
	return http.get("/music/song/list", {
		params: {
			id,
			current,
			size,
		},
	});
};

/**
 * @description 歌曲最新评论列表
 * @param id 歌曲id
 * @param current 页码
 * @param size 页数
 * */
export const queryMusicNewCommentListApi = (
	id: string | number,
	current: number,
	size: number
): Promise<{ total: number; list: any[] }> => {
	return http.get("/music/song/comment/list", {
		params: {
			id,
			current,
			size,
		},
	});
};

/**
 * @description 歌曲热门评论列表
 * @param id 歌曲id
 * @param current 页码
 * @param size 页数
 * */
export const queryMusicHotCommentListApi = (
	id: string | number,
	current: number,
	size: number
): Promise<{ total: number; list: any[] }> => {
	return http.get("/music/song/commentHot/list", {
		params: {
			id,
			current,
			size,
		},
	});
};

/**
 * @description 判断歌曲可以播放吗
 * @param id 歌曲id
 * */
export const getSongCanPlayApi = (id: number): Promise<any> => {
	return http.get("/music/song/can/play", {
		params: {
			id,
		},
	});
};

/**
 * @description 获取歌曲详细信息
 * @param id id
 * @param level 音质 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 * */
export const querySongDetailApi = (id: number): Promise<any[]> => {
	return http.get("/music/song/detail", {
		params: {
			id,
		},
	});
};

/**
 * @description 获取歌曲url
 * @param id id
 * @param level 音质 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 * */
export const querySongMp3Api = (id: number, level: string): Promise<any> => {
	return http.get("/music/song/url", {
		params: {
			id,
			level,
		},
	});
};

/**
 * @description 获取歌词
 * @param id 歌曲id
 * */
export const querySongLyricApi = (id: number): Promise<string> => {
	return http.get("/music/song/lyric", {
		params: {
			id,
		},
	});
};

/**
 * @description 搜索歌曲接口
 * @param keywords 关键字
 * @param current 当前页
 * @param size 页数
 * */
export const searchMusicListApi = (
	keywords: string,
	current: number,
	size: number
): Promise<any[]> => {
	return http.get("/music/search/song", {
		params: {
			keywords,
			current,
			size,
		},
	});
};

/**
 * @description 网易云搜索热门列表接口
 * */
export const queryMusicSearchHotsApi = () => {
	return http.get("/music/search/hot");
};

/**
 * @description 随机一首网易云音乐
 * @param type 音乐分类
 * */
export const getMusicOnceApi = (type: string): Promise<SongInfoType> => {
	return http.get("/song/detail", {
		params: {
			type,
		},
	});
};

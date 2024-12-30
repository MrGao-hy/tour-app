import http from "@/api/http";
import { SongInfoType } from "@/typing";

/**
 * 网易云热门歌单
 * */
const getMusicHotClassApi = () => {
	return http.get("/music/hot/class");
};

/**
 * 网易云歌单分类
 * */
const getMusicClassApi = () => {
	return http.get("/music/class");
};

/**
 * 歌单列表
 * @param id id
 * @param page 页码
 * @param size 页数
 * */
const querySongListApi = (
	id: number,
	page: number,
	size: number
): Promise<any[]> => {
	return http.get("/music/song/list", {
		params: {
			id,
			page,
			size,
		},
	});
};

/**
 * 判断歌曲可以播放吗
 * @param id 歌曲id
 * */
const getSongCanPlayApi = (id: number): Promise<any> => {
	return http.get("/music/song/can/play", {
		params: {
			id,
		},
	});
};

/**
 * 获取歌曲详细信息
 * @param id id
 * @param level 音质 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 * */
const querySongDetailApi = (id: number): Promise<any[]> => {
	return http.get("/music/song/detail", {
		params: {
			id,
		},
	});
};

/**
 * 获取歌曲url
 * @param id id
 * @param level 音质 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 * */
const querySongMp3Api = (id: number, level: string): Promise<any> => {
	return http.get("/music/song/mp3", {
		params: {
			id,
			level,
		},
	});
};

/**
 * 获取歌词
 * @param id 歌曲id
 * */
const querySongLyricApi = (id: number): Promise<string> => {
	return http.get("/music/song/lyric", {
		params: {
			id,
		},
	});
};

/**
 * 搜索歌曲接口
 * @param keywords 关键字
 * */
const searchMusicListApi = (keywords: string): Promise<any[]> => {
	return http.get("/music/search/song", {
		params: {
			keywords,
		},
	});
};

/**
 * 随机一首网易云音乐
 * @param type 音乐分类
 * */
const getMusicOnceApi = (type: string): Promise<SongInfoType> => {
	return http.get("/song/detail", {
		params: {
			type,
		},
	});
};

export {
	getMusicClassApi,
	getMusicHotClassApi,
	querySongListApi,
	getSongCanPlayApi,
	querySongDetailApi,
	querySongMp3Api,
	querySongLyricApi,
	searchMusicListApi,
	getMusicOnceApi,
};

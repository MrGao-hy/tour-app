export interface TikTokType {
	aweme_id: string;
	desc: string;
	author: {
		uid: string;
		nickname: string;
		avatar_thumb: {
			url_list: string[];
			width: string;
			height: string;
		};
	};
	music: {
		id: string;
		title: string;
		author: string;
		album: string;
		cover_hd: {
			uri: string;
			url_list: string[];
			width: string;
			height: string;
		};
		play_url: {
			uri: string;
			url_list: string[];
			width: string;
			height: string;
			url_key: string;
		};
	};
	video: {
		play_addr: {
			uri: string;
			url_list: string[];
			width: string;
			height: string;
			data_size: string;
		};
		cover: {
			uri: string;
			url_list: string[];
		};
	};
	share_info: {
		share_link_desc: string;
		share_url: string;
	};
	statistics: StatisticsVo;
}
interface StatisticsVo extends KeyVo {
	admire_count: string;
	comment_count: string;
	digg_count: string;
	collect_count: string;
	play_count: string;
	share_count: string;
}
export interface KeyVo {
	[key: string]: string;
}

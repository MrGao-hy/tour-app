import { n } from "vitest/dist/reporters-cb94c88b";

export interface MountType {
	/**
	 * id
	 * */
	id: string;
	/**
	 * 名字
	 * */
	name?: string;
	/**
	 * 海拔
	 * */
	altitude?: number;
	/**
	 * 图片地址
	 * */
	url?: string;
	/**
	 * 分享二维码
	 * */
	qrCode?: string;
	/**
	 * 简介
	 * */
	introduction?: string;
	/**
	 * 地址
	 * */
	address?: string;
	/**
	 * 纬度
	 * */
	latitude?: number;
	/**
	 * 经度
	 * */
	longitude?: number;
	isFinish?: boolean;
	/**
	 * 评论数
	 * */
	markCount?: number;
	/**
	 * 收藏数
	 * */
	collectCount?: number;
	/**
	 * 是否收藏
	 * */
	collect?: boolean;
}

import { UserInfoType } from "@/typing";

export interface ReplyType {
	/**
	 * 回复id
	 * */
	id: string;
	/**
	 * 主评论id
	 * */
	markId: string;
	/**
	 * 用户id
	 * */
	userId: string;
	/**
	 * 内容
	 * */
	content: string;
	/**
	 * 省份
	 * */
	province: string;
	/**
	 * 城市
	 * */
	city: string;
	/**
	 * 创建时间
	 * */
	createTime: string;
	/**
	 * 个人信息
	 * */
	userInfo: UserInfoType;
}

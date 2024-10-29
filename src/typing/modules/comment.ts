import { MarkMountType, UserInfoType } from "@/typing";

export interface CommentType extends MarkMountType {
	/**
	 * 点赞数
	 * */
	likeNum: number;
	/**
	 * 是否点赞
	 * */
	isLike: boolean;
	/**
	 * 用户信息
	 * */
	userInfo: UserInfoType;
}

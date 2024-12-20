import http from "../http";
import { PageConfigType, ReplyType } from "@/typing";

/**
 * 查询评论回复列表
 * @param current 当前页
 * @param size 页数
 * @param markId 评论id
 * */
export const queryReplyListApi = (
	current: number,
	size: number,
	markId: string
): Promise<PageConfigType<ReplyType>> => {
	return http.post("/markReply/reply/list", {
		current,
		size,
		in: {
			markId,
		},
	});
};

/**
 * 回复评论
 * @param data 集合
 * */
export const replyMarkApi = (
	data: ReplyType
): Promise<PageConfigType<ReplyType>> => {
	return http.post("/markReply/reply", data);
};

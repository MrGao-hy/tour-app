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
 * @param markId 评论id
 * @param content 内容
 * */
export const replyMarkApi = (
	markId: string,
	content: string
): Promise<PageConfigType<ReplyType>> => {
	return http.post("/markReply/reply", {
		markId,
		content,
	});
};

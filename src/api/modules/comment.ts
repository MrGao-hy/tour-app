import http from "../http";
import { CommentType, MarkMountType, PageConfigType } from "@/typing";

/**
 * 查询景区评论列表
 * @param current 当前页
 * @param size 页数
 * @param mountId 景区id
 * */
export const queryCommentListApi = (
	current: number,
	size: number,
	mountId: string
): Promise<PageConfigType<CommentType>> => {
	return http.post("/mark/comment/list", {
		current,
		size,
		in: {
			mountId,
		},
	});
};

/**
 * 给景区打分
 * */
export const markMountApi = (data: MarkMountType): Promise<null> => {
	return http.post("/mark/mount", data);
};

/**
 * 删除评论
 * @param id 评语id
 * */
export const deleteCommentApi = (id: string): Promise<boolean> => {
	return http.post("/mark/comment/delete", {
		id,
	});
};

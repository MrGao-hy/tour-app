import http from "../http";
import { CommentType, MarkMountType } from "@/typing";

/**
 * 查询景区评论列表
 * */
export const queryCommentListApi = (
	mountId: string
): Promise<CommentType[]> => {
	return http.post("/mark/comment/list", {
		mountId,
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

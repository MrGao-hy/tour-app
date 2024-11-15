import { defineStore } from "pinia";
import { deleteCommentApi, queryCommentListApi } from "@/api";
import { CommentType } from "@/typing";

export const useCommentStore = defineStore("comment", {
	state: () => ({
		selectComment: {} as CommentType,
		commentList: [] as Array<CommentType>,
	}),
	actions: {
		/**
		 * 获取评论列表
		 * */
		getCommentListFn(id: string) {
			return new Promise(async (resolve) => {
				const res = await queryCommentListApi(id);
				this.commentList = res.map((item) =>
					Object.assign(item, { isLike: false, likeNum: 0 })
				);
				resolve(res);
			});
		},
		/**
		 * 点击操作栏
		 * */
		async onClickMenu(type: number) {
			switch (type) {
				case 1:
					const isDel = await deleteCommentApi(this.selectComment.id);
					if (isDel) {
						this.commentList.splice(
							this.commentList.findIndex(
								(item) => item.id === this.selectComment.id
							),
							1
						);
					}
					break;
				case 2:
					uni.setClipboardData({
						data: this.selectComment.comment,
						success: () => {
							uni.$u.toast("复制成功");
						},
						fail(error) {
							uni.$u.toast(error.errMsg);
						},
					});
					break;
				default:
					break;
			}
		},
		/**
		 * 选中数据
		 * */
		selectCommentFn(temp: CommentType) {
			this.selectComment = temp;
		},
		/**
		 * 点赞
		 * */
		clickLike(index: number) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		},
		/**
		 * 调整回复页面
		 * */
		toReplyPage(temp: CommentType) {
			this.selectCommentFn(temp);
			uni
				.navigateTo({
					url: "/pages/pages-mount/reply/Index",
				})
				.then();
		},
	},
});

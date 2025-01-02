import { defineStore } from "pinia";
import { deleteCommentApi, queryCommentListApi } from "@/api";
import { CommentType, UserType } from "@/typing";
import { useUserStore } from "@/store";
import { ref } from "vue";
import { config } from "@/config";

export const useCommentStore = defineStore(`${config.prefix}comment`, () => {
	const selectComment = ref<CommentType>({
		city: "",
		comment: "",
		id: "",
		isLike: false,
		likeNum: 0,
		mark: "",
		mountId: "",
		province: "",
		userInfo: {
			id: "",
			userName: "",
			avatar: "",
			phone: "",
			sex: "",
		},
	});
	const commentList = ref<Array<CommentType>>([]);

	/**
	 * @description 获取评论列表
	 * @param current 当前页
	 * @param size 页码
	 * @param id 景区id
	 * */
	const getCommentListFn = (current: number, size: number, id: string) => {
		return new Promise(async (resolve, reject) => {
			const res = await queryCommentListApi(current, size, id);
			if (!res.records.length) {
				uni.$u.toast("没有更多评论了");
				reject(res);
			}
			commentList.value = [
				...commentList.value,
				...res.records.map((item) =>
					Object.assign(item, { isLike: false, likeNum: 0 })
				),
			];
			resolve(res);
		});
	};
	/**
	 * @description 把评论数据放在列表里，实现假评论成功视觉
	 * @param mark 评分数据详情
	 * */
	const setCommentListFn = (mark: CommentType) => {
		// 假数据push到数组里面，形成有数据视觉效果
		const userStore = useUserStore();
		mark.userInfo = userStore.userInfo as UserType;
		commentList.value.unshift(mark);
	};
	/**
	 * @description 操作评分功能栏
	 * @param type 1-删除评论；2-复制评论
	 * */
	const onClickMenu = async (type: number) => {
		switch (type) {
			case 1:
				const isDel = await deleteCommentApi(selectComment.value.id);
				if (isDel) {
					commentList.value.splice(
						commentList.value.findIndex(
							(item) => item.id === selectComment.value.id
						),
						1
					);
				}
				break;
			case 2:
				uni.setClipboardData({
					data: selectComment.value.comment,
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
	};
	/**
	 * @description 选中数据
	 * @param temp 评分内容详情
	 * */
	const selectCommentFn = (temp: CommentType) => {
		selectComment.value = temp;
	};
	/**
	 * @description 保存数据到列表
	 * @param temp 评分列表
	 * */
	const setCommentList = (temp: CommentType[] = []) => {
		commentList.value = temp;
	};
	/**
	 * @description 点赞评论
	 * @param index 索引
	 * */
	const clickLike = (index: number) => {
		commentList.value[index].isLike = !commentList.value[index].isLike;
		if (commentList.value[index].isLike) {
			commentList.value[index].likeNum++;
		} else {
			commentList.value[index].likeNum--;
		}
	};
	/**
	 * @description 跳转回复页面
	 * @param temp 评分内容详情
	 * */
	const toReplyPage = (temp: CommentType) => {
		uni
			.navigateTo({
				url: "/pages/pages-mount/reply/Index",
			})
			.then();
		selectCommentFn(temp);
	};
	return {
		selectComment,
		commentList,

		getCommentListFn,
		setCommentListFn,
		onClickMenu,
		selectCommentFn,
		setCommentList,
		clickLike,
		toReplyPage,
	};
});

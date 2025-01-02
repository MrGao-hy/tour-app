import { defineStore } from "pinia";
import { config } from "@/config";
import {
	queryMusicHotCommentListApi,
	queryMusicNewCommentListApi,
} from "@/api";
import { reactive } from "vue";

export const useSongCommentStore = defineStore(
	`${config.prefix}songComment`,
	() => {
		const comment = reactive<{ total: number; list: any[] }>({
			total: 0,
			list: [],
		});
		const page = reactive({
			current: 1,
			size: config.pageSize,
		});

		/**
		 * @description 获取最新评论列表
		 * @param id 歌曲id
		 * */
		const getMusicNewCommentsFn = async (id: string | number) => {
			const res = await queryMusicNewCommentListApi(
				id,
				page.current,
				page.size
			);
			if (!res.list.length) {
				page.current -= 1;
				return uni.$u.toast("没有更多评论");
			}
			comment.total = res.total;
			comment.list = [...comment.list, ...res.list];
		};

		/**
		 * @description 获取最热评论列表
		 * @param id 歌曲id
		 * */
		const getMusicHotCommentsFn = async (id: string | number) => {
			const res = await queryMusicHotCommentListApi(
				id,
				page.current,
				page.size
			);
			if (!res.list.length) {
				page.current -= 1;
				return uni.$u.toast("没有更多评论");
			}
			comment.total = res.total;
			comment.list = [...comment.list, ...res.list];
		};
		/**
		 * @description 清除数据
		 * */
		const clearCommentsFn = () => {
			comment.list = [];
		};

		/**
		 * @description 设置当前页
		 * */
		const setCurrentPage = (current: number) => {
			page.current = current;
		};

		return {
			comment,
			page,

			getMusicNewCommentsFn,
			getMusicHotCommentsFn,
			clearCommentsFn,
			setCurrentPage,
		};
	}
);

/**
 * 分页
 * */
export interface PageConfigVo {
	/**
	 * @description 当前页
	 * */
	current: number;
	/**
	 * @description 页数
	 * */
	size: number;
	/**
	 * @description 搜索条件
	 * */
	searchVal?: string;
	/**
	 * @description 排序
	 * */
	sort?: string;
	/**
	 * @description 排序字段
	 * */
	sortField?: string;
}

export interface PageConfigType<T> extends PageConfigVo {
	/**
	 * 总页数
	 * */
	total: number;
	/**
	 * 数据列表
	 * */
	records: T[];
	/**
	 * 搜索当前页
	 * */
	searchCount: boolean;
}

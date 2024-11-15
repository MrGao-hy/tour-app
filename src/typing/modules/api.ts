/**
 * 分页
 * */
export interface PageConfigVo {
	/**
	 * 当前页
	 * */
	current: number;
	/**
	 * 页数
	 * */
	size: number;
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

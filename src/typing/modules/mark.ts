export interface MarkMountType {
	/**
	 * id
	 * */
	id: string;
	/**
	 * 景区id
	 * */
	mountId: string;
	/**
	 * 评语
	 * */
	comment: string;
	/**
	 * 打分数值
	 * */
	mark: number | string;
	/**
	 * 创建时间
	 * */
	createTime?: string;
}

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
	 * 省份
	 * */
	province: string;
	/**
	 * 城市
	 * */
	city: string;
	/**
	 * 打分数值
	 * */
	mark: number | string;
	/**
	 * 创建时间
	 * */
	createTime?: string;
	/**
	 * 总回复数
	 * */
	allReply?: number;
}

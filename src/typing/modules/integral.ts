export interface IntegralType {
	/**
	 * id
	 * */
	id: string;
	/**
	 * 我的id
	 * */
	userId: string;
	/**
	 * 活动id
	 * */
	activeId: string;
	/**
	 * 积分
	 * */
	integral: number;
	/**
	 * 积分类型： 1-使用，0-获取
	 * */
	type: number;
	/**
	 * 备注
	 * */
	remark: string;
	/**
	 * 创建时间
	 * */
	createTime: string;
}

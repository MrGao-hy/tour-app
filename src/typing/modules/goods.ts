import { AddressVo } from "@/typing";

export interface GoodsVo {
	id: string;
	/**
	 * @description 礼品名字
	 * */
	name: string;
	/**
	 * @description 礼品图片
	 * */
	url: string;
	/**
	 * @description 礼品库存
	 * */
	quantity: number;
	/**
	 * @description 礼品原价
	 * */
	price: number;
	/**
	 * @description 礼品积分
	 * */
	integral: number;
	/**
	 * @description 创建时间
	 * */
	createTime: string;
}

export interface OrderType {
	/**
	 * 订单id
	 * */
	id: string;
	/**
	 * 订单编号
	 * */
	orderId: string;
	/**
	 * 订单状态
	 * */
	status: string;
	/**
	 * 订单生成时间
	 * */
	createTime: string;
	/**
	 * 商品集合
	 * */
	goods: GoodsVo;
	/**
	 * 地址集合
	 * */
	address: AddressVo;
}

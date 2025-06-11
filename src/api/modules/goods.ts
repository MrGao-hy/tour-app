import http from "@/api/http";
import { GoodsVo, OrderType, PageConfigType, PageConfigVo } from "@/typing";

/**
 * @description 礼品列表
 * @param params 分页参数
 * */
export const queryGoodsListApi = (
	params: PageConfigVo
): Promise<PageConfigType<GoodsVo>> => {
	return http.post("/goods/list", params);
};

/**
 * @description 兑换商品
 * @param goodsId 商品id
 * @param addressId 地址id
 * */
export const exchangeGoodsListApi = (
	goodsId: string,
	addressId: string
): Promise<PageConfigType<GoodsVo>> => {
	return http.post("/order/exchange", {
		goodsId,
		addressId,
	});
};

/**
 * @description 订单列表
 * @param params 分页集合 UNVERIFIED-未核销；VERIFIED-已核销
 * */
export const orderListApi = (
	params: PageConfigVo
): Promise<PageConfigType<OrderType>> => {
	return http.post("/order/list", params);
};

/**
 * @description 订单详情
 * @param id 订单id
 * */
export const orderDetailApi = (id: string): Promise<OrderType> => {
	return http.post("/order/detail", {
		id,
	});
};

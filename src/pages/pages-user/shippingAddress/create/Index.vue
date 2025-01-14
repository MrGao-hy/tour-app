<template>
	<view class="address-edit">
		<up-card :show-head="false">
			<template #body>
				<yk-form
					ref="ykFormRef"
					:columns="columns"
					:formData="addressForm"
					:formRules="rules"
					:labelWidth="70"
				></yk-form>
			</template>
		</up-card>
		<up-button text="保存" type="primary" @click="saveAddressFn"></up-button>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { queryOneAddressApi, saveAddressApi } from "@/api";
import { AddressVo } from "@/typing";
import { onLoad } from "@dcloudio/uni-app";
import { columns, rules } from "./data";

const ykFormRef = ref();
const addressForm = ref<AddressVo>({
	id: "",
	name: "",
	phone: "",
	add: "",
	address: "",
	province: "",
	city: "",
	prefecture: "",
	defaultVal: false,
	remark: "",
});

onLoad(async (options) => {
	if (options?.id) {
		const res = await queryOneAddressApi(options.id);

		addressForm.value = Object.assign(res, {
			add: `${res.province} ${res.city} ${res.prefecture}`,
		});
	}
});

/**
 * @description 保存发货地址
 * */
const saveAddressFn = async () => {
	ykFormRef.value.formRef.validate().then(async () => {
		const add = addressForm.value.add!.split(" ");
		const address = Object.assign(addressForm.value, {
			province: add[0],
			city: add[1],
			prefecture: add[2],
		});
		await saveAddressApi(address);
		uni.$u.toast("保存成功");
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2];
		console.log(prevPage);
		let prevPagePath = prevPage.route;
		if (prevPagePath === "pages/pages-task/goods/goodsList/Index") {
			await uni.navigateBack({
				delta: 1,
			});
		}
	});
};
</script>

<style lang="scss" scoped>
.address-edit {
	overflow: hidden;
}
:deep(.u-button) {
	position: absolute;
	bottom: 80px;
	width: 600rpx;
	left: calc(50vw - 300rpx);
}
</style>

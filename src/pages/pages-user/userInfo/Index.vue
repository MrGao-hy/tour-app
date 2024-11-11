<template>
	<view class="pages">
		<up-form :model="userInfo" ref="infoRefs">
			<view class="user-info">
				<!--头像-->
				<up-form-item label="头像" labelWidth="60">
					<yk-upload
						:fileList="photos"
						:maxCount="1"
						@chooseMedia="afterRead"
						@delete="deletePic"
					></yk-upload>
				</up-form-item>
				<!--签名-->
				<up-form-item label="签名">
					<up-textarea
						v-model="userInfo.signature"
						placeholder="填写一个好的签名，让更多人关注你吧！"
						count
					></up-textarea>
				</up-form-item>
			</view>
			<view class="user-info">
				<yk-form
					:columns="columns"
					:formData="userInfo"
					:labelWidth="70"
				></yk-form>
			</view>
			<up-gap height="40" bg-color="#f4f4f5"></up-gap>
			<up-button type="success" :loading="editBtnLoading" @click="edinInfoBtnFn"
				>修改</up-button
			>
		</up-form>
	</view>

	<!--没有网络的状态-->
	<up-no-network></up-no-network>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TypeEnum, throttle } from "hfyk-app";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { updateUserInfoApi } from "@/api";
import { constellationList, educationList, sexList } from "./data";

const userStore = useUserStore();
const columns = [
	{ field: "userName", label: "用户名", type: TypeEnum.INPUT },
	{ field: "name", label: "真实姓名", type: TypeEnum.INPUT },
	{ field: "idCard", label: "身份证号", type: TypeEnum.INPUT },
	{ field: "phone", label: "手机号", type: TypeEnum.INPUT },
	{ field: "sex", label: "性别", type: TypeEnum.RADIO, actions: sexList },
	{ field: "emit", label: "邮箱", type: TypeEnum.INPUT },
	{ field: "birthDate", label: "出生日期", type: TypeEnum.DATE, mode: "date" },
	{
		field: "constellation",
		label: "星座",
		type: TypeEnum.SELECT,
		column: constellationList,
	},
	{
		field: "education",
		label: "学历",
		type: TypeEnum.SELECT,
		column: educationList,
	},
	{ field: "school", label: "学校", type: TypeEnum.INPUT },
	{ field: "major", label: "专业", type: TypeEnum.INPUT },
	{ field: "address", label: "住址", type: TypeEnum.INPUT },
];
const editBtnLoading = ref(false); // 按钮圈圈
const { userInfo } = storeToRefs(userStore);

onMounted(async () => {
	await userStore.getUserInfo();
});

// // 删除图片
// const deletePic = async (event: any) => {
//   const i = event.index;
//   photos.value.splice(i, 1);
//   await deleteFileApi(userInfo.value.avatar);
//   userInfo.value.avatar = "";
// };

// 上传图片
// const afterRead = async ({ list, tempFiles }) => {
//   list.map(async (item, i) => {
//     console.log(item);
//     const res = await imageStore.uploadFile(item.url, i, "image");
//     userInfo.value.avatar = res.url;
//   });
// };

// 修改用户信息
const edinInfoBtnFn = throttle(async () => {
	editBtnLoading.value = true;
	await updateUserInfoApi(userInfo.value);
	uni.$u.toast("修改用户信息成功");
	editBtnLoading.value = false;
}, 2000);
</script>

<style lang="scss" scoped>
.pages {
	background: #f4f4f5;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	.user-info {
		background: white;
		border-radius: 15rpx;
		padding: 0 20rpx;
		margin-bottom: 40rpx;
	}
}
:deep(.u-radio-group--row) {
	justify-content: space-between;
}
</style>

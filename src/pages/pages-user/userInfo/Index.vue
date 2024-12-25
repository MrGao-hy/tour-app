<!--
  Author: 高先华
  Date: 2024-05-11 10:36:02
  LastEditTime: 2024-05-16 10:59:52
  Description: 修改个人信息页面
  FilePath: \src\pages-user\userInfo\Index.vue
-->
<template>
	<view class="pages">
		<up-form :model="userInfo" ref="infoRefs">
			<view class="user-info">
				<view class="progress">
					<up-line-progress
						:percentage="schedule"
						height="8"
						:showText="false"
					></up-line-progress>
					<view class="progress-text"
						>资料完成度
						<text style="color: #697bfe">{{ schedule }}%</text></view
					>
				</view>
				<!--头像-->
				<up-form-item label="头像" labelWidth="60">
					<yk-upload
						:fileList="[{ url: userInfo.avatar }]"
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
import { ref, onMounted, reactive } from "vue";
import { TypeEnum, throttle } from "hfyk-app";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store";
import { updateUserInfoApi } from "@/api";
import { constellationList, educationList, sexList } from "./data";

const userStore = useUserStore();
const columns = [
	{ field: "userName", label: "用户名", type: TypeEnum.INPUT },
	{
		field: "avatar",
		label: "网络头像",
		type: TypeEnum.INPUT,
		placeholder: "请直接上传网络头像地址",
	},
	{ field: "name", label: "真实姓名", type: TypeEnum.INPUT },
	{ field: "phone", label: "手机号", type: TypeEnum.INPUT },
	{ field: "idCard", label: "身份证", type: TypeEnum.INPUT },
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
const schedule = ref<string>("");

onMounted(async () => {
	await userStore.getUserInfo();
	const count = {
		all: 0,
		accomplish: 0,
	};

	Object.keys(userInfo.value).forEach((key) => {
		if (
			["createTime", "id", "oldPassword", "password", "roles", "salt"].includes(
				key
			)
		)
			return;
		count.all++;
		if (userInfo.value[key]) {
			count.accomplish++;
		}
	});
	// 完成进度条
	schedule.value = ((count.accomplish / count.all) * 100).toFixed(0);
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
		position: relative;
		.progress {
			width: 300rpx;
			position: absolute;
			right: $gxh-border-margin-padding-base;
			top: 70rpx;
			&-text {
				font-size: $gxh-font-size-hint;
				color: $gxh-color-hint;
				text-align: center;
				margin-top: $gxh-border-margin-padding-sm;
			}
			:deep(.u-line-progress__line) {
				background-image: linear-gradient(
					to right,
					#61affc,
					#697bfe
				) !important;
			}
		}
	}
}
:deep(.u-radio-group--row) {
	justify-content: space-between;
}
</style>

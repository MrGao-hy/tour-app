<!--<template>-->
<!--	<view class="dialog dialog-shade">-->
<!--		<view class="dialog-container">-->
<!--			<up-image-->
<!--				class="dialog-container__icon"-->
<!--				bgColor="transparent"-->
<!--				:src="icon"-->
<!--				:width="140"-->
<!--				:height="140"-->
<!--			></up-image>-->
<!--			<view class="dialog-container__title">{{ title }}</view>-->
<!--			<view class="dialog-container__content">{{ content }}</view>-->

<!--			<view class="dialog-container__btn">-->
<!--				<up-button-->
<!--					v-if="showCancel"-->
<!--					:text="cancelText"-->
<!--					:color="cancelColor"-->
<!--					:shape="shape"-->
<!--					size="large"-->
<!--					@click="result(false)"-->
<!--				></up-button>-->
<!--				<up-button-->
<!--					:text="confirmText"-->
<!--					:color="confirmColor"-->
<!--					:shape="shape"-->
<!--					size="large"-->
<!--					@click="result(true)"-->
<!--				></up-button>-->
<!--			</view>-->
<!--		</view>-->
<!--	</view>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--/**-->
<!-- * @用途-->
<!-- * @author Pino-->
<!-- * @创建时间 2023-01-11 15:19-->
<!-- **/-->
<!--import dialog from "@/components/dialog";-->

<!--export interface DialogParam {-->
<!--	icon?: string;-->
<!--	title?: string;-->
<!--	content?: string;-->
<!--	confirmText?: string;-->
<!--	cancelText?: string;-->
<!--	shape?: "circle" | "square";-->
<!--	confirmColor?: string;-->
<!--	cancelColor?: string;-->
<!--	showCancel?: boolean;-->
<!--	result?: Function; // 回调用户操作结果-->
<!--}-->

<!--const props = withDefaults(defineProps<DialogParam>(), {-->
<!--	icon: "/static/icon/success.png",-->
<!--	title: "提示",-->
<!--	content: "",-->
<!--	confirmText: "确认",-->
<!--	cancelText: "取消",-->
<!--	shape: "circle",-->
<!--	confirmColor: "#906FFE",-->
<!--	cancelColor: "",-->
<!--	showCancel: false,-->
<!--	result: () => {},-->
<!--});-->

<!--const close = () => dialog.close();-->

<!--const result = (isSure: boolean) => {-->
<!--	if (props.result)-->
<!--		props.result({-->
<!--			confirm: isSure == true,-->
<!--			cancle: isSure == false,-->
<!--		});-->
<!--	close();-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.dialog {-->
<!--	position: fixed;-->
<!--	z-index: 999999;-->
<!--	&-shade {-->
<!--		top: 0;-->
<!--		width: 100%;-->
<!--		height: 100%;-->
<!--		background: rgba(0, 0, 0, 0.5);-->
<!--	}-->
<!--	&-container {-->
<!--		position: absolute;-->
<!--		transform: translate(-50%, -50%);-->
<!--		left: 50%;-->
<!--		top: 50%;-->
<!--		border-radius: 40px;-->
<!--		background: #ffffff;-->
<!--		width: 90%;-->
<!--		//height: 300px;-->
<!--		padding: 40px 20px;-->
<!--		text-align: center;-->

<!--		&__icon {-->
<!--			position: absolute;-->
<!--			top: -100px;-->
<!--			left: 50%;-->
<!--			transform: translateX(-50%);-->
<!--		}-->

<!--		&__title {-->
<!--			margin: 20px 0;-->
<!--			font-size: 50rpx;-->
<!--		}-->
<!--		&__content {-->
<!--			margin: 20px 0;-->
<!--			font-size: 30rpx;-->
<!--			color: #c3d8db;-->
<!--		}-->
<!--		&__btn {-->
<!--			display: flex;-->
<!--			.u-button {-->
<!--				margin: 30px 10px 20px;-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--}-->
<!--</style>-->

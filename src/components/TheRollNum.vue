<template>
	<view class="hideWrap" :style="hideWrapWidth">
		<view
			class="numWrap"
			:style="item1.position"
			v-for="(item1, index) in newNum"
			:key="index"
		>
			<view
				v-for="(item, index) in defaultNum"
				:style="{
					fontSize: item1.isDecimal ? '38rpx;' : '',
					color: color,
				}"
				class="numItemWrap"
			>
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, watch } from "vue";

export default defineComponent({
	props: ["num", "color"],
	setup(props) {
		const data = reactive({
			hideWrapWidth: "width:180rpx;",
			numWrapWidth: 28,
			newNum: [
				{
					num: "0",
					position: "left:0rpx;top:-0%;",
				},
				{
					num: "0",
					position: "left:28rpx;top:-0%;",
				},
				{
					num: "0",
					position: "left:56rpx;top:-0%;",
				},
				{
					num: "0",
					position: "left:84rpx;top:-0%;",
				},
				{
					num: "0",
					position: "left:112rpx;top:-0%;",
				},
				{
					num: "0",
					position: "left:140rpx;top:-0%;",
				},
				{
					num: "0",
					position: "left:168rpx;top:-0%;",
				},
			],
			defaultNum: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."], // 有几位数就遍历多少次defaultNum
		});

		onMounted(() => {
			setNum(props.num);
		});

		watch(
			() => props.num,
			(newVal) => {
				setNum(newVal);
			}
		);

		const setNum = (num: string) => {
			const newNum: any[] = [];
			const thisNum: any[] = `${num}`.split("");
			let leftPx = 0;
			let isDecimal = false;
			for (let i = 0; i < thisNum.length; i++) {
				if (thisNum[i] === ".") {
					isDecimal = true;
				}
				const obj: any = {};
				const topLength = 10 - thisNum[i];
				const left = `left:${leftPx}rpx;`;
				const top = `top:-${
					thisNum[i] === "." ? "1000" : (10 - topLength) * 100
				}%;`;
				obj.num = thisNum[i];
				obj.position = left + top;
				if (isDecimal) {
					obj.isDecimal = true;
				}
				newNum.push(obj);
				leftPx += data.numWrapWidth;
			}
			data.hideWrapWidth = `width:${leftPx}rpx;`;
			setTimeout(() => {
				data.newNum = newNum;
			}, 100);
		};

		return {
			...toRefs(data),

			setNum,
		};
	},
});
</script>

<style lang="scss" scoped>
/*调整文字高度*/
$height: 40rpx;
.hideWrap {
	position: relative;
	//height: $height;
	overflow: hidden;
	padding: 20rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.numWrap {
	position: absolute;
	top: 0;
	transition: all 2s;
	-moz-transition: all 2s;
	/* Firefox 4 */
	-webkit-transition: all 3s;
	/* Safari 和 Chrome */
	-o-transition: all 1s;
	/* Opera */
}

.numItemWrap {
	text-align: center;
	width: 30rpx;
	line-height: $height;
	font-size: 44rpx;
	height: $height;
	font-weight: 500;
}
</style>

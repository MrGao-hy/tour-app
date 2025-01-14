<template>
	<up-card
		:title="title"
		title-size="20"
		padding="10"
		margin="0"
		:head-border-bottom="false"
		:foot-border-top="false"
		:border="false"
		full
	>
		<template #body>
			<scroll-view class="list" scroll-x scroll-with-animation>
				<template v-for="item in list" :key="item.id">
					<view class="col">
						<navigator
							:url="
								'/pages/pages-recreation/music/songList/Index?id=' + item.id
							"
						>
							<view
								class="box"
								:style="`background-image:URL('${
									item.coverImgUrl || config.music
								}')`"
							>
								<view class="box-hot" v-if="item.usedCount || item.playCount">
									<view class="iconfont icon-tinggeliang"></view>
									{{
										item.playCount
											? formatNumber(item.playCount)
											: formatNumber(item.usedCount)
									}}
								</view>

								<view class="box-bottom" v-if="item.updateFrequency">
									{{ item.updateFrequency }}
								</view>
							</view>
						</navigator>
						<view class="title">{{ item.name }}</view>
						<view class="description">{{ item.description }}</view>
					</view>
				</template>
			</scroll-view>
		</template>
	</up-card>
</template>
<script setup lang="ts">
import { formatNumber } from "@/utils/utils";
import { config } from "@/config";

interface IProps {
	list: any[];
	title: string;
}
const props = withDefaults(defineProps<IProps>(), {
	list: () => [],
	title: "",
});
</script>

<style lang="scss" scoped>
.list {
	:deep(.uni-scroll-view-content) {
		display: flex;
	}
	.col {
		display: flex;
		flex-direction: column;
		margin: 0 11rpx;
		flex: 1;
		width: 220rpx;
		.box {
			width: 220rpx;
			height: 220rpx;
			border-radius: $gxh-border-radius-lg;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: $gxh-image-bg-color;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			position: relative;
			overflow: hidden;
			&-hot {
				color: white;
				font-size: 22rpx;
				display: flex;
				align-items: center;
				.iconfont {
					margin-right: $gxh-border-margin-padding-sm;
				}
			}
			&-bottom {
				width: 100%;
				color: white;
				font-size: $gxh-font-size-sm;
				text-align: center;
				padding: $gxh-border-margin-padding-sm;
				background-color: rgba(0, 0, 0, 0.5);
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}

		.title {
			color: $gxh-color-title;
			font-size: $gxh-font-size-lg;
			@include line-feed(1);
		}
		.description {
			color: $gxh-color-hint;
			font-size: $gxh-font-size-hint;
			@include line-feed(2);
		}
	}
}
</style>

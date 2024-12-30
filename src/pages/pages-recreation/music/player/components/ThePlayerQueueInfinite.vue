<!--
Author: zusheng
Date: 2022-04-29 19:40:15
LastEditTime: 2022-05-13 19:34:38
Description: 歌曲列表-虚拟无限滚动列表
FilePath: \uni-preset-vue-vite-ts\src\components\ThePlayerQueueInfinite.vue
-->

<template>
  <view :style="{ position: 'absolute', height: data.listHeight }">
    <slot name="title"></slot>
  </view>

  <!-- 虚拟无限滚动列表 s -->
  <view
    class="infinite__list"
    :style="{
      opacity: loading ? 0 : 1,
      height: data.listHeight,
      'padding-top': pdTop,
    }"
  >
    <!-- items s -->
    <view
      v-for="item in songs"
      :key="item.payload"
      class="player-detail__queue-li infinite__item"
      :class="{
        'queue-li-active': item.payload === playerStore.playerInfo.payload,
      }"
      @tap="toPlayer(item)"
    >
      <image
        v-if="item.payload === playerStore.playerInfo.payload"
        class="player-detail__queue-li__poster"
        src="@/static/images/music/equaliser.svg"
        mode="aspectFit"
      />
      <image
        v-else
        class="player-detail__queue-li__poster"
        :src="item.picUrl + '?param=50y50'"
        mode="aspectFit"
      />
      <view class="player-detail__queue-li__info text-ellipsis-single">
        <view class="player-detail__queue-li__info-title text-ellipsis-single">
          {{ item.title }}
        </view>
        <view class="player-detail__queue-li__info-artist text-ellipsis-single">
          {{ item.artist }}
        </view>
      </view>
      <view class="player-detail__queue-li__handle" />
    </view>
    <!-- items e -->
  </view>
  <!-- 虚拟无限滚动列表 e -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="less">
.infinite__list {
  box-sizing: border-box;
  transition: opacity 0.3s;
}

.player-detail__queue-li {
  height: 92rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 7.7rpx 0;
  // 封面
  .player-detail__queue-li__poster {
    height: 92rpx;
    width: 92rpx;
    padding: 0;
    border-radius: 10rpx;
  }
  // 歌曲信息
  .player-detail__queue-li__info {
    flex: 1;
    padding: 0 33rpx;
    box-sizing: border-box;
    line-height: 1.6;
    .player-detail__queue-li__info-title {
      font-size: 32rpx;
      color: #fff;
      font-weight: 400;
    }
    .player-detail__queue-li__info-artist {
      font-size: 24rpx;
      color: rgb(232, 232, 232);
      font-weight: 400;
    }
  }
  // 拖动把手
  .player-detail__queue-li__handle {
    height: 92rpx;
    width: 92rpx;
    background-color: rgb(232, 232, 232);
    mask-size: 40%;
    mask-position: right center;
    mask-repeat: no-repeat;
    mask-image: url("@/static/images/music/ed5.png");
  }
}

// 正在播放的样式
.queue-li-active {
  // 封面
  .player-detail__queue-li__poster {
    height: 92rpx;
    width: 92rpx;
    border-radius: 10rpx;
    padding: 28rpx;
    box-sizing: border-box;
  }

  // 歌曲信息
  .player-detail__queue-li__info {
    .player-detail__queue-li__info-title {
      color: var(--theme-color);
    }
    .player-detail__queue-li__info-artist {
      color: var(--theme-color);
    }
  }
}
</style>

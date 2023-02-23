<template>
  <div :class="theme == 'dark' ? 'main-box' : 'main-box-light'">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
const { theme } = storeToRefs(useUserStore());
let popoverBgc = 'red';
let popoverArrow = '#fff';
</script>

<style lang="scss">
// 底部音量popper

@mixin dark-style {
  background-color: rgb(31, 31, 31);
  // 深色头部
  .header {
    background-color: #242424;
    color: #8e8e8e !important;
  }
  //深色侧边栏
  .side-menu {
    background-color: #383838 !important;
    color: #c3c3c3;
  }
  .active {
    color: #fff;
    background-image: linear-gradient(120deg, #e6e6e646 0%, #c1c1c124 100%);
  }
  //深色内容主视区域
  .right-wrapper {
    color: #bcbbbb;
    .hover-bg-view {
      @apply hover:bg-stone-700;
    }

    //加载更多按钮
    .Btn {
      color: #ffffff;
      background-color: rgba(62, 62, 62, 0.398) !important;
    }
    // 音乐馆样式
    .bg-view {
      @apply dark:bg-[#1e1e1f];
    }
    .bg-dc {
      @apply dark:bg-stone-800;
    }
  }
  // 播放器样式
  .main-color {
    transition: all 0.4s;
    color: #fff;
    background-color: #2c2c2c;
    &:hover {
      background-color: #616161;
    }
  }
  .video-tag-wrap {
    color: #8e8e8e;
    border: #8e8e8e32 1px solid;
  }
  .video-operate-wrap {
    border: #8e8e8e32 1px solid;
    transition: all 0.3s;
    // background-color: ;
    &:hover {
      background-color: #151515;
    }
  }
  .inputDeep {
    ::-webkit-scrollbar {
      width: 8px; /*滚动条宽度*/
      height: 8px; /*滚动条高度*/
    }
    .el-textarea__inner::-webkit-scrollbar-thumb {
      background-color: rgba(168, 168, 168, 0.4); /*滚动条默认显示的颜色*/
    }

    .el-textarea__inner::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: white; /*滚动条背景色显示的颜色*/
    }
    .el-textarea__inner {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.276) inset;
      background-color: rgba(255, 0, 0, 0);
      resize: none;
      padding-bottom: 20px;
    }
    .el-input__count {
      background-color: rgba(255, 255, 255, 0);
    }
  }
  .item-split-line {
    border-bottom: 1px solid #59595929;
  }
  .item-split-line-t {
    border-top: 1px solid #3d3d3df9;
  }
  .relay-area-wrap {
    background-color: #282828;
  }
  .playing {
    border-radius: 5px;
    background-color: #494949;
  }
  //右键菜单样式
  .right-menu-color {
    background-color: #4f4f4f;
    border: #dddddd44 solid 1px;
    .table-right-menu-item:hover {
      background-color: #a9a9a937;
      color: rgb(41, 177, 93);
    }
  }
  // 底部sliderBar
  .slider-bar {
    .el-slider__button {
      background-color: rgb(255, 255, 255) !important;
      border: #bababa;
      height: 10px;
      width: 10px;
    }
    .el-slider__bar {
      background-image: linear-gradient(90deg, #2af598 0%, #009efd 100%);
    }
    .el-slider__runway {
      background-color: rgb(115, 115, 115);
    }
  }
  // //弹出歌单列表
  .el-overlay {
    position: absolute !important;
    .el-drawer {
      @apply w-full miniplayer:w-1/2 #{!important};
      background-color: rgb(76, 76, 76);
    }
    .el-drawer__header {
      margin: 0;
    }
    .el-drawer__body {
      padding: 0px;
    }
  }
  //收藏到歌单样式
  .collect-wrap {
    background-color: rgb(75, 75, 75) !important;
    .title-color {
      color: #f0f0f0 !important;
    }
    .musicListItem {
      transition: all 0.2s;
      background-color: rgb(83, 83, 83);
      color: #cfcfcf;
      &:hover {
        background-color: rgb(148, 148, 148);
        color: #ffffff;
      }
    }
  }
  //歌曲详情页样式
  .song-bg {
    position: absolute;
    z-index: 0;
    filter: blur(88px) brightness(0.4);
  }
}

@mixin light-style {
  background-color: rgb(255, 255, 255);
  // 浅色头部
  .header {
    color: #8e8e8e !important;
    border-bottom: #c3c3c34d 1px solid;
    .inputDeep {
      .el-input__wrapper {
        background-color: rgb(234, 234, 234) !important;
      }
    }
  }
  //浅色侧边栏
  .side-menu {
    border-right: #c3c3c34d 1px solid;
    color: #8b8b8b;
  }
  .active {
    color: #fff;
    background-image: linear-gradient(90deg, #2af598 0%, #009efd 100%);
  }
  //加载更多按钮
  .Btn {
    color: #8e8e8e;
    background-color: rgba(234, 234, 234, 0.398) !important;
  }
  //浅色内容主视区域
  .right-wrapper {
    color: #8b8b8b;
    .hover-bg-view {
      @apply hover:bg-stone-100;
    }
    // 音乐馆样式
    .bg-view {
      @apply bg-white;
    }
    .bg-dc {
      color: #8b8b8b;
      @apply dark:bg-stone-100;
    }
    .button-dc {
      @apply flex  rounded justify-center items-center h-8 text-sm transition-all cursor-pointer;
      @apply bg-white text-gray-500 border-gray-200 border;
      @apply hover:text-emerald-500;
    }
  }
  // 播放器样式
  .main-color {
    transition: all 0.4s;
    color: #fff;
    background-image: linear-gradient(90deg, #2af598 0%, #009efd 100%);
    &:hover {
      background-image: linear-gradient(90deg, #20c279 0%, #0073ba 100%);
    }
  }
  .video-tag-wrap {
    color: #8e8e8e;
    border: #8e8e8e32 1px solid;
  }
  .video-operate-wrap {
    border: #8e8e8e32 1px solid;
    transition: all 0.3s;
    &:hover {
      color: #ffffff;
      // border: none;
      background-image: linear-gradient(150deg, #2cdb8c 0%, #3eb5ff 100%);
      border: #ffffff 1px solid;
    }
  }
  .inputDeep {
    ::-webkit-scrollbar {
      width: 8px; /*滚动条宽度*/
      height: 8px; /*滚动条高度*/
    }
    .el-textarea__inner::-webkit-scrollbar-thumb {
      background-color: rgba(168, 168, 168, 0.4); /*滚动条默认显示的颜色*/
    }

    .el-textarea__inner::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: white; /*滚动条背景色显示的颜色*/
    }
    .el-textarea__inner {
      color: #8e8e8e;
      box-shadow: 0 0 0 1px rgba(29, 29, 29, 0.129) inset;
      background-color: rgba(240, 240, 240, 0.367);
      resize: none;
      padding-bottom: 20px;
    }
    .el-input__count {
      background-color: rgba(255, 255, 255, 0);
    }
  }
  .item-split-line {
    border-bottom: 1px solid #ddddddb7;
  }
  .item-split-line-t {
    border-top: 1px solid #ddddddb7;
  }
  .relay-area-wrap {
    border: 1px solid #ddddddb7;
    background-color: #e4e3e32f;
  }
  //浅色我喜欢的音乐样式
  .playing {
    background-color: #e7e7e7;
  }
  //右键菜单样式
  .right-menu-color {
    background-color: #ffffff;
    border: #dddddd44 solid 1px;
    .table-right-menu-item:hover {
      background-color: #a9a9a937;
      color: rgb(155, 155, 155);
    }
  }
  // 底部sliderBar
  .slider-bar {
    .el-slider__button {
      background-color: rgb(255, 255, 255) !important;
      border: #bababa;
      height: 10px;
      width: 10px;
    }
    .el-slider__bar {
      background-image: linear-gradient(90deg, #2af598 0%, #009efd 100%);
    }
    .el-slider__runway {
      background-color: rgb(201, 201, 201);
    }
  }
  // // 歌单列表
  .el-overlay {
    position: absolute !important;
    .el-drawer {
      @apply w-full miniplayer:w-1/2 #{!important};
      background-color: rgb(220, 220, 220);
    }
    .el-drawer__header {
      margin: 0;
    }
    .el-drawer__body {
      padding: 0px;
    }
  }
  //收藏到歌单样式
  .collect-wrap {
    background-color: rgb(255, 255, 255) !important;
    .title-color {
      color: #6c6c6c !important;
    }
    .musicListItem {
      transition: all 0.2s;
      background-color: rgb(231, 231, 231);
      color: #767676;
      &:hover {
        background-color: rgb(148, 148, 148);
        color: #ffffff;
      }
    }
  }
  //歌曲详情页样式
  .song-bg {
    position: absolute;
    z-index: 0;
    filter: blur(50px) brightness(0.4);
  }
}
.main-box {
  transition: all 0.4s;
  width: 100% !important;
  height: 100vh;
  @include dark-style();
}
.main-box-light {
  transition: all 0.4s;
  width: 100% !important;
  height: 100vh;
  @include light-style();
}
</style>

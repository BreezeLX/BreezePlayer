<template>
  <el-drawer v-model="showPlayList" :with-header="false">
    <div class="flex flex-col h-full">
      <div class="px-5 text-xl py-2">播放列表</div>
      <div class="flex justify-between px-5">
        <span>共{{ playListCount }}首</span>
        <span class="cursor-pointer" @click="clearPlayList">清空列表</span>
      </div>
      <el-empty v-if="playList.length === 0" description="列表暂无歌曲" />
      <div class="flex-1 overflow-hidden">
        <el-scrollbar>
          <playListItem
            v-for="song in playList"
            :song="song"
            :active="song.id === id"
            @dblclick="play(song.id)"
          >
          </playListItem>
        </el-scrollbar>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { usePlayerStore } from '@/store/player';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const { showPlayList, playList, playListCount, id } = storeToRefs(
  usePlayerStore()
);
const { play, clearPlayList } = usePlayerStore();
</script>

<style lang="scss" scoped>
:deep(.el-drawer) {
  // background-color: pink !important;
}
.el-scrollbar {
  padding: 0;
  border: 0;
}
</style>

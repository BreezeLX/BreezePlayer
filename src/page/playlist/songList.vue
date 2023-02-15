<template>
  <div>
    <div class="flex text-xs text-gray-400 py-2">
      <div class="flex-auto">歌曲</div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
      <div class="w-20">时长</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs.slice(0, pageSize * page)" :key="song.id">
        <song-list-item :song="song" show-ar-name show-al-name />
      </template>
    </div>
    <div
      class="flex justify-center py-5"
      v-if="songs.length > pageSize && !noMore"
    >
      <el-button
        color="rgb(30, 30, 31)"
        class="text-center w-full"
        @click="loadMore"
        >加载更多</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Song } from '@/models/song';
import { computed, ref } from 'vue';

const props = defineProps<{
  songs: Song[];
}>();

const pageSize = ref(20);
const page = ref(1);
const loadMore = () => {
  page.value = page.value + 1;
};
const noMore = computed(() => {
  return page.value - props.songs.length / pageSize.value >= 0;
});
</script>

<style lang="scss" scoped>
button {
  border: 1px solid rgba(255, 255, 255, 0.289);
}
.el-button {
  color: rgb(222, 222, 222);
}
</style>

<template>
  <Title title="新歌推荐" />
  <div
    class="grid grid-flow-row grid-cols-2 2xl:grid-cols-5 gap-y-2.5 gap-x-5 cursor-pointer"
  >
    <div
      v-for="(item, index) in recommendedNewSong"
      :key="index"
      class="hover-bg-view transition-all flex items-center"
      @click="play(item.id)"
    >
      <img
        :src="item.picUrl"
        alt=""
        class="w-12 h-12 object-cover rounded flex-shrink-0"
      />
      <div class="px-2 text-xs flex-auto flex flex-col w-1/3">
        <div class="text-xs flex-1 truncate">
          {{ item.name }}
        </div>
        <div class="mt-1.5 text-dc">
          {{ item.song.artists[0].name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiscoverStore } from '@/store/discover';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { usePlayerStore } from '@/store/player';

const { play } = usePlayerStore();

const { recommendedNewSong } = storeToRefs(useDiscoverStore());
const { getRecommendedNewSong } = useDiscoverStore();
onMounted(() => {
  getRecommendedNewSong();
});
</script>

<style></style>

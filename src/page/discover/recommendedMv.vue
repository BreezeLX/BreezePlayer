<template>
  <Title title="Mv推荐" />
  <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
    <div v-for="item in recommendedMv" :key="item.id">
      <CoverPlay
        :pic-url="item.picUrl"
        video
        :name="item.name"
        :play-count="item.playCount"
        show-play-count
      />
      <div class="truncate text-xs mt-2">{{ item.name }}</div>
      <div class="truncate text-xs mt-1.5 text-slate-400">
        <small>{{ item.artistName }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiscoverStore } from '@/store/discover';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const { recommendedMv } = storeToRefs(useDiscoverStore());
const { getRecommendedMv } = useDiscoverStore();
onMounted(() => {
  getRecommendedMv();
});
</script>

<style></style>

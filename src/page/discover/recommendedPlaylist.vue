<template>
  <Title title="推荐歌单"></Title>
  <div
    class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 gap-5 2xl:grid-cols-10"
  >
    <div
      v-for="(item, index) in recommendedPlaylist.sampleSize(10)"
      :key="index"
      :class="{ 'item-1': index === 0 }"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.picUrl"
        :play-count="item.playCount"
        show-play-count
        @click="checkPlayList(item)"
      />
      <div class="mt-2 text-xs text-main truncate">{{ item.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDiscoverStore } from '@/store/discover';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const { recommendedPlaylist } = storeToRefs(useDiscoverStore());
const { getRecommendedPlaylist } = useDiscoverStore();

const checkPlayList = (item) => {
  router.push({ name: 'playlist', query: { id: item.id } });
  console.log(item);
};
onMounted(() => {
  getRecommendedPlaylist();
});
</script>

<style></style>

<template>
  <playlistHot @cat-change="catChange" />
  <div class="py-5 text-xl">{{ pageData.cat }}歌单</div>
  <div
    class="gap-5 grid grid-flow-row grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{ 'item-1': index === 0 }"
      @click="router.push({ name: Pages.playlist, query: { id: item.id } })"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
        show-play-count
      />
      <div class="mt-2 text-xs text-main leading-5">{{ item.name }}</div>
      <div class="mt-2 text-xs text-main truncate text-dc">
        {{ item.creator.nickname }}
      </div>
    </div>
  </div>
  <div class="py-10" v-if="pageData.more">
    <el-button
      class="text-center w-full"
      @click="loadMore"
      color="rgb(30, 30, 31)"
      :loading="pageData.loading"
      >加载更多</el-button
    >
  </div>
</template>

<script setup lang="ts">
import playlistHot from './playlistHot.vue';
import { onMounted, reactive, ref } from 'vue';
import type { PlayListDetail } from '@/models/playlist';
import { getTopPlaylistHighquality } from '@/service/modules/playlist';
import CoverPlay from '@/components/common/CoverPlay.vue';
import { useRouter } from 'vue-router';
import { Pages } from '@/router/pages';

const list = ref<PlayListDetail[]>();

const router = useRouter();

const pageData = reactive({
  init: false,
  loading: false,
  limit: 35,
  before: 0,
  more: false,
  cat: '全部'
});

const catChange = (cat: string) => {
  pageData.cat = cat;
  pageData.before = 0;
  pageData.more = false;

  getData();
};

const getData = async () => {
  pageData.loading = true;
  try {
    const { playlists, lasttime, more } = await getTopPlaylistHighquality({
      limit: pageData.limit,
      before: pageData.before,
      cat: pageData.cat
    });
    if (pageData.before <= 0) {
      list.value = playlists;
    } else {
      list.value?.push(...playlists);
    }
    pageData.init = true;
    pageData.loading = false;

    pageData.before = lasttime;
    pageData.more = more;
  } catch (e) {}
};

const loadMore = () => {
  getData();
};

onMounted(getData);
</script>
<style lang="scss" scoped>
.el-button {
  color: rgb(222, 222, 222);
}
</style>

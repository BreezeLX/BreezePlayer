<template>
  <div class="palyList" v-if="playlist">
    <playlistInfo :playlist="playlist" :playAll="playAll"></playlistInfo>
    <el-tabs class="mt-3" v-model="tab">
      <el-tab-pane lazy :label="`歌曲 ${songs.length}`" name="tracks">
        <songList :songs="songs"></songList>
      </el-tab-pane>
      <el-tab-pane lazy label="评论" name="comments">1</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  getPlayListTrackAll,
  getPlayListDetail
} from '@/service/modules/playlist';
import type { PlayListDetail } from '@/models/playlist';
import { usePlayerStore } from '@/store/player';
import type { Song } from '@/models/song';
import playlistInfo from './playlistInfo.vue';
import songList from './songList.vue';

const tab = ref('tracks');
const route = useRoute();
const playlist = ref<PlayListDetail>();
const songs = ref<Song[]>([]);
const { pushPlayList, play } = usePlayerStore();

const playAll = () => {
  pushPlayList(true, ...songs.value);
  play(songs.value.first().id);
};

const getData = () => {
  const id: any = route.query.id;
  getPlayListDetail(id).then((res) => {
    console.log('歌单详情', res);
    playlist.value = res;
  });
  getPlayListTrackAll(id).then((res) => {
    console.log('歌单歌曲', res);
    songs.value = res;
  });
};

watch(
  () => route.query.id,
  () => {
    if (route.name == 'playlist') {
      getData();
    }
  }
);
onMounted(getData);
</script>

<style></style>

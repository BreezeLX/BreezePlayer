<template>
  <div
    :class="{ active: active }"
    class="playlist-item px-5 py-2 border-b cursor-pointer flex justify-between hover-bg-view"
  >
    <div class="w-3/5 truncate">{{ song.name }}</div>
    <div class="w-2/5 truncate">{{ song.ar.first().name }}</div>
    <div>{{ useFormatDuring(song.dt / 1000) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useFormatDuring } from '@/utils/number';
import type { Song } from '@/models/song';
defineProps<{
  song: Song;
  active: boolean;
}>();
</script>

<style lang="scss" scoped>
.playlist-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.186);
}

.active {
  border-left: 5px solid rgb(0, 213, 18);
}
</style>

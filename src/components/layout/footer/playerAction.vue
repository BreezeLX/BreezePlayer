<template>
  <div class="flex flex-row-reverse items-center h-full pr-4">
    <IconPark
      :icon="MusicList"
      size="25"
      class="text-slate-400 m-3 hover-text"
      @click="showPlayList = !showPlayList"
    ></IconPark>

    <el-popover placement="top" width="50px" popper-class="popperClass">
      <template #reference>
        <IconPark
          :icon="VolumeNotice"
          size="25"
          :stroke-width="3"
          class="text-slate-400 m-3 hover-text hidden sm:block"
        />
      </template>
      <PlayerVolumeSlider />
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import {
  VolumeMute,
  VolumeNotice,
  VolumeSmall,
  MusicList
} from '@icon-park/vue-next';
import PlayerVolumeSlider from '@/components/layout/footer/playerVolumeNotice.vue';
import { usePlayerStore } from '@/store/player';
import { storeToRefs } from 'pinia';

const { volume, showPlayList } = storeToRefs(usePlayerStore());
// const { } = usePlayerStore();
</script>

<style lang="scss" scoped></style>

<template>
  <div class="flex flex-col box-border justify-center h-full">
    <div class="flex justify-center items-center">
      <IconPark
        :icon="
          loopType === 0 ? PlayOnce : loopType === 1 ? LoopOnce : ShuffleOne
        "
        size="20"
        class="text-slate-400 mx-2 hover-text hidden sm:block"
        @click="toggleLoop"
      ></IconPark>
      <IconPark
        :icon="GoStart"
        size="25"
        class="text-slate-400 mx-2 hover-text"
        @click="prev"
      ></IconPark>
      <IconPark
        theme="filled"
        :icon="isPause ? Play : Pause"
        size="38"
        class="text-slate-400 mx-2 leading-9 hover-text"
        @click="togglePlay"
      ></IconPark>
      <IconPark
        :icon="GoEnd"
        size="25"
        class="text-slate-400 mx-2 hover-text"
        @click="next"
      ></IconPark>
      <IconPark
        :icon="Like"
        size="20"
        class="text-slate-400 mx-2 hover-text hidden sm:block"
        title="喜欢"
      ></IconPark>
    </div>
    <div class="flex justify-between items-center px-4">
      <div class="w-10 hidden sm:block">{{ useFormatDuring(currentTime) }}</div>
      <div class="flex-1 px-3 hidden sm:block">
        <el-slider
          :show-tooltip="false"
          v-model="currentTime"
          @change="sliderChange"
          @input="sliderIput"
          :min="0"
          :max="duration"
        />
      </div>
      <div class="w-10 hidden sm:block">{{ useFormatDuring(duration) }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconPark from '@/components/common/IconPark.vue';
import {
  PlayOnce,
  LoopOnce,
  ShuffleOne,
  Play,
  GoEnd,
  GoStart,
  Like,
  Pause
} from '@icon-park/vue-next';
import { usePlayerStore } from '@/store/player';
import { storeToRefs } from 'pinia';
import { useFormatDuring } from '@/utils/number';
const { loopType, song, isPause, currentTime, duration } = storeToRefs(
  usePlayerStore()
);
const { togglePlay, toggleLoop, next, prev, sliderChange, sliderIput } =
  usePlayerStore();
</script>

<style lang="scss" scoped>
.el-slider:deep() {
  .el-slider__button {
    background-color: rgb(255, 255, 255) !important;
    border: #000;
    height: 10px;
    width: 10px;
  }
  .el-slider__bar {
    background-color: rgb(148, 163, 184);
  }
}
</style>

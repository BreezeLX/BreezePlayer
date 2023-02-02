<template>
  <div class="flex player-song overflow-hidden">
    <div class="h-full p-2 flex-shrink-0">
      <img
        class="cur-song-img h-full rounded-md cursor-pointer"
        :src="
          song.al?.picUrl ? song.al.picUrl : '../../../static/OpticalDisk.png'
        "
      />
    </div>
    <div class="ml-1 text-base flex flex-col justify-center">
      <div class="w-40 cursor-pointer truncate mb-2">
        <div class="flex">
          <!-- <div
            v-if="songUrl.freeTrialInfo?.end > 0"
            class="bg-red-500 text-xs text-white rounded px-0.5 scale-75"
          >
            试听
          </div> -->
          <span>{{ song.name || 'music' }}</span>
          <span class="ml-2 text-dc">
            - {{ song.ar?.first().name || `BreezePlaer` }}
          </span>
        </div>
      </div>
      <div class="flex gap-x-3 text-main">
        <IconPark
          :icon="Like"
          size="25"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />
        <IconPark
          :icon="DownTwo"
          size="25"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />
        <IconPark
          :icon="MoreTwo"
          size="25"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />

        <IconPark
          :icon="Comment"
          size="25"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconPark from '@/components/common/IconPark.vue';
import { Like, DownTwo, MoreTwo, Comment } from '@icon-park/vue-next';
import { usePlayerStore } from '@/store/player';
import { storeToRefs } from 'pinia';
const { loopType, song, isPlaying, isPause } = storeToRefs(usePlayerStore());
</script>

<style scoped lang="scss">
.player-song {
  height: 100%;
}
</style>

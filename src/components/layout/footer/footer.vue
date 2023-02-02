<template>
  <div style="height: 90px" class="bg-slate-900 flex items-stretch">
    <div class="flex-1 miniplayer:flex-none h-full">
      <currentSong />
    </div>
    <div class="sm:flex-1 h-full">
      <PlayerController />
    </div>
    <div class="miniplayer:flex-0 h-full">
      <playerAction />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

<template>
  <main-box slot="">
    <router-view></router-view>
  </main-box>
</template>

<script setup lang="ts">
import mainBox from '@/components/layout/main-box/main-box.vue';
import { userPlayerInit } from '@/store/player';
userPlayerInit();
</script>
<style></style>

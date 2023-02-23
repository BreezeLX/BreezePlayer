<template>
  <my-header></my-header>
  <div class="content-body">
    <div class="left-wrapper hidden miniplayer:block" v-if="showSideMenu">
      <my-menu></my-menu>
    </div>
    <div class="right-wrapper flex-1 lg:block">
      <my-contaier></my-contaier>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bus from '@/utils/eventBus';
import { ref } from 'vue';
let showSideMenu = ref(true);
let toggleSideMenu = () => {
  showSideMenu.value = !showSideMenu.value;
};
Bus.$on('toggleSideMenu', toggleSideMenu);
</script>
<style scoped lang="scss">
.content-body {
  height: calc(100% - 59px);
  display: flex;
}

.left-wrapper {
  transition: all 0.3s;
  box-sizing: border-box;
  width: 227px;
  height: 100%;
}

.right-wrapper {
  box-sizing: border-box;
  width: calc(100% - 227px);
}
</style>

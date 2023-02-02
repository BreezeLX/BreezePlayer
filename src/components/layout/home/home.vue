<template>
  <my-header></my-header>
  <div class="content-body">
    <div class="left-wrapper hidden miniplayer:block">
      <my-menu></my-menu>
    </div>
    <div class="right-wrapper flex-1 lg:block">
      <my-contaier></my-contaier>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.content-body {
  height: calc(100% - 59px);
  display: flex;
}

.left-wrapper {
  box-sizing: border-box;
  width: 227px;
  // background-color: pink;
  height: 100%;
}

.right-wrapper {
  box-sizing: border-box;
  background-color: pink;
  width: calc(100% - 227px);
}
</style>

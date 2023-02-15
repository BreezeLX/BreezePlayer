<template>
  <el-scrollbar>
    <RouterView />
    <PlayList></PlayList>
  </el-scrollbar>
  <div>
    <playerfooter></playerfooter>
  </div>
</template>

<script lang="ts" setup>
import playerfooter from '@/components/layout/footer/footer.vue';
import PlayList from '../playList/playList.vue';
</script>

<style lang="scss" scoped>
.el-scrollbar {
  width: 100%;
  padding: 15px !important;
  background-color: rgb(30, 30, 31);
  height: calc(100% - 89px) !important;
}
:deep(.el-overlay) {
  position: absolute !important;
  .el-drawer {
    @apply w-full miniplayer:w-1/2 #{!important};
  }
  .el-drawer__header {
    margin: 0;
  }
  .el-drawer__body {
    padding: 0px;
  }
}

:deep(.el-dialog) {
  border-radius: 5px;
  .el-dialog__header {
    display: none;
  }
}
</style>

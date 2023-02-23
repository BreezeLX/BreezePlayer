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
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
let route = useRoute();
let contaierBg = ref();
watch(
  () => route.name,
  (newVal) => {
    console.log(newVal);
    if (newVal == 'musicDetail') {
      contaierBg.value = '#000';
    } else {
      contaierBg.value = '';
    }
  }
);
</script>

<style lang="scss" scoped>
.el-scrollbar {
  width: 100%;
  padding: 15px !important;
  background-color: v-bind('contaierBg');
  height: calc(100% - 89px) !important;
}

:deep(.el-dialog) {
  border-radius: 5px;
  .el-dialog__header {
    display: none;
  }
}
</style>

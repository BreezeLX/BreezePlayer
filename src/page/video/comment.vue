<template>
  <el-form
    ><el-form-item>
      <el-input
        class="inputDeep"
        v-model="value"
        autosize
        type="textarea"
        maxlength="200"
        show-word-limit
      /> </el-form-item
  ></el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

let value = ref();
</script>

<style lang="scss" scoped>
.inputDeep {
  :deep(.el-textarea__inner) {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.276) inset;
    background-color: rgba(255, 0, 0, 0);
    resize: none;
    padding-bottom: 20px;
  }
  :deep(.el-input__count) {
    background-color: rgba(255, 255, 255, 0);
  }
}

.el-form-item {
  margin: 0;
}
</style>

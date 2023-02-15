<template>
  <div class="flex flex-col items-center mt-20">
    <div>该 功 能 需 要 登 录 , 请 先 登 录</div>
    <div class="border px-5 py-1 rounded mt-2 cursor-pointer" @click="goLogin">
      去登录
    </div>
  </div>
</template>

<script lang="ts" setup>
import Bus from '@/utils/eventBus';

let goLogin = () => {
  Bus.$emit('checkLoginAction');
};
</script>

<style></style>

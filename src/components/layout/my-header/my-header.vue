<template>
  <div class="header flex items-center justify-between">
    <div class="flex flex-grow lg:w-3/4">
      <div class="text-white hidden pl-8 pr-8 miniplayer:block">
        BreezePlayer
      </div>
      <div class="top-btn-wrap flex items-center">
        <el-icon :size="20" class="m-2 cursor-pointer hover:text-gray-400"
          ><i-ep-arrowLeft @click="checkTopBtn('forward')"
        /></el-icon>
        <el-icon :size="20" class="m-2 cursor-pointer hover:text-gray-400"
          ><i-ep-arrowRight @click="checkTopBtn('next')"
        /></el-icon>
      </div>
      <div class="w-full miniplayer:w-1/2 text-center">
        <el-input
          v-model="searchvalue"
          class="inputDeep"
          size="large"
          placeholder="输入搜索内容"
          :prefix-icon="Search"
        />
      </div>
    </div>

    <div class="px-3 flex items-center">
      <div class="cursor-pointer flex items-center px-2">
        <div class="flex items-center" v-if="isLogin">
          <el-avatar :size="40" :src="profile?.avatarUrl" />
          <div class="pl-2 hidden miniplayer:block cursor-pointer">
            {{ profile?.nickname }}
          </div>
        </div>
        <div v-if="!isLogin" class="logined-wrap" @click="checkLogin">
          <i class="pl-2 cursor-pointer">登录</i>
        </div>
      </div>

      <IconPark
        :icon="Platte"
        size="20"
        class="text-slate-400 mx-2 hover-text"
      ></IconPark>
      <IconPark
        :icon="Mail"
        size="20"
        class="text-slate-400 mx-2 hover-text"
      ></IconPark>
    </div>
  </div>

  <!-- 登录弹出层 -->
  <el-dialog
    v-model="showLogin"
    title="登录"
    width="330px"
    align-center
    append-to-body
    @close="onDialogClose"
  >
    <img :src="qr" alt="" />
    <!-- <div>
      <el-input
        size="large"
        placeholder="手机号码"
        :prefix-icon="Phone"
        v-model="phone"
      />
      <el-input
        size="large"
        class="mt-5"
        placeholder="登录密码"
        :prefix-icon="Lock"
        v-model="password"
      />

      <button
        @click="loginSubmit"
        class="button w-full mt-5 py-5"
        style="border-radius: 5px"
      >
        登录
      </button>
    </div> -->
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { Platte, Lock, Phone, Mail } from '@icon-park/vue-next';
import { useUserStore } from '@/store/user';
import { getQrKey, createQrImage, checkQrStatus } from '@/service/modules/user';
import { storeToRefs } from 'pinia';
import Bus from '@/utils/eventBus';

const router = useRouter();
const searchvalue = ref();
const showLogin = ref(false);
const phone = ref('');
const password = ref('');
const qr = ref('');
let { checkLoginStatus } = useUserStore();
let { profile, isLogin } = storeToRefs(useUserStore());

//弹出登录层
let timer;
let checkLogin = async () => {
  showLogin.value = true;
  let { unikey: key } = await getQrKey();
  let { qrimg } = await createQrImage(key);
  qr.value = qrimg;

  // 循环查询二维码状态
  let i = 0;
  timer = setInterval(() => {
    checkQrStatus(key).then((res) => {
      i++;
      if (res.code === 803) {
        //扫码成功
        localStorage.setItem('USER-COOKIE', res.cookie);

        clearInterval(timer);
      }
      console.log(`${i}次`, res);
    });
  }, 1000);
};

Bus.$on('checkLoginAction', checkLogin);
//前进后退按钮
let checkTopBtn = (key) => {
  if (key === 'forward') {
    router.back();
  } else {
    router.forward();
  }
};

let onDialogClose = () => {
  clearInterval(timer);
};
let loginSubmit = () => {
  console.log('点击了提交登录');
};
onUnmounted(() => {
  Bus.$off('checkLoginAction');
});
onMounted(checkLoginStatus);
</script>

<style scoped lang="scss">
.header {
  line-height: 58px;
  height: 58px;
  width: 100%;
  // border-bottom: 1px solid #ddd;
  background-color: rgb(48, 49, 51);
}

.inputDeep {
  width: 90%;
  overflow: hidden;
  border-radius: 20px !important;

  :deep(.el-input__inner) {
    color: #000 !important;
  }

  :deep(.el-input__wrapper) {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color));
  }
}
</style>

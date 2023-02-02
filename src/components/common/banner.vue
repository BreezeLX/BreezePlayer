<template>
  <Swiper
    slides-per-group-auto
    slides-per-view="auto"
    :navigation="true"
    :grab-cursor="true"
  >
    <SwiperSlide v-for="item in banners" :key="item.encodeId">
      <img :src="item.imageUrl" class="banner-image" />
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { onMounted, ref } from 'vue';
import { useDiscoverStore } from '@/store/discover';
import { storeToRefs } from 'pinia';

//banner数据初始化
onMounted(() => {
  getBannerAction();
});

//每一页显示多少条数据
let perShowNum = ref(4);
const { banners } = storeToRefs(useDiscoverStore());
let { getBannerAction } = useDiscoverStore();
</script>

<style lang="scss" scoped>
.swiper:deep() {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}

.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>

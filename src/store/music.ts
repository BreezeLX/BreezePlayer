import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTopListDetail } from '@/service/modules/getTopListDetail';
import type { TopListDetail } from '@/models/toplist_detail';

export const useMusicStore = defineStore('music', () => {
  const topListDetailData = ref<TopListDetail[]>([]);
  const getTopListDetailData = async () => {
    console.log('排行数据', topListDetailData.value);
    if (topListDetailData.value.length) return;
    topListDetailData.value = await getTopListDetail();
  };

  return {
    topListDetailData,
    getTopListDetailData
  };
});

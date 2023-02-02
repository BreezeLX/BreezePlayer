<template>
  <div
    class="grid grid-flow-row grid-cols-5 lg:grid-cols-8 2xl:grid-cols-12 gap-2.5"
  >
    <div class="button-dc" @click="catClick('全部')">全部</div>
    <div
      v-for="tag in tags"
      :key="tag.id"
      class="button-dc"
      @click="catClick(tag.name)"
    >
      {{ tag.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPlaylistHighqualityTags } from '@/service/modules/playlist';
import { useRouter } from 'vue-router';
import type { PlaylistHighqualityTag } from '@/models/playlist';

const emit = defineEmits<{
  (e: 'catChange', cat: string): void;
}>();

const catClick = (cat: string) => {
  emit('catChange', cat);
};

const router = useRouter();
const tags = ref<PlaylistHighqualityTag[]>();

onMounted(async () => {
  tags.value = await getPlaylistHighqualityTags();
});
</script>

<style lang="scss">
.t {
}
</style>

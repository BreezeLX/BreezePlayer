import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

interface IMusicMenu {
  label: string;
  name: string;
}

export function useMusicMenu() {
  const menus: IMusicMenu[] = [
    {
      label: '排行',
      name: 'toplist'
    },
    {
      label: '歌手',
      name: 'artist'
    },
    {
      label: '分类歌单',
      name: 'category'
    }
  ];

  const router = useRouter();
  const route = useRoute();
  const currentMenu = ref(route.name);

  watch(
    () => route.name,
    (m) => {
      currentMenu.value = m;
    }
  );

  const onTabClick = ({ props }: { props: IMusicMenu }) => {
    console.log(props);
    router.push({ name: props.name, replace: true });
  };

  return {
    menus,
    currentMenu,
    onTabClick
  };
}

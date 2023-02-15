import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Pages } from '@/router/pages';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Pages.home,
    component: () => import('@/components/layout/home/home.vue'),
    redirect: { name: Pages.discover },
    children: [
      {
        path: 'discover',
        name: 'discover',
        component: () => import('@/page/discover/discover.vue'),
        meta: {
          menu: 'discover',
          keepAlive: true
        }
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('@/page/playlist/playlist.vue')
      },
      {
        path: 'music',
        name: 'music',
        component: () => import('@/page/music/music.vue'),
        redirect: { name: 'toplist' },
        meta: {
          menu: 'music',
          keepAlive: true
        },
        children: [
          {
            path: 'toplist',
            name: 'toplist',
            component: () => import('@/page/music/toplist/toplist.vue'),
            meta: {
              menu: 'music',
              keepAlive: true
            }
          },
          {
            path: 'artist',
            name: 'artist',
            component: () => import('@/page/music/artist/artist.vue'),
            meta: {
              menu: 'music',
              title: '歌手',
              keepAlive: true
            }
          },
          {
            path: Pages.category,
            name: Pages.category,
            component: () => import('@/page/music/category/category.vue'),
            meta: {
              menu: 'music',
              title: '分类歌单',
              keepAlive: true
            }
          }
        ]
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/page/video/video.vue'),
        meta: {
          menu: 'video',
          keepAlive: true
        }
      },
      {
        path: 'dj',
        name: 'dj',
        component: () => import('@/page/dj/dj.vue'),
        meta: {
          menu: 'dj',
          keepAlive: true
        }
      },
      {
        path: 'videoPlayer',
        name: 'videoPlayer',
        component: () => import('@/page/video/videoplayer.vue'),
        meta: {
          menu: 'videoPlayer',
          keepAlive: true
        }
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('@/page/favorite/favorite.vue'),
        meta: {
          menu: 'favorite',
          keepAlive: true
        }
      },
      {
        path: 'recent',
        name: 'recent',
        component: () => import('@/page/recent/recent.vue'),
        meta: {
          menu: 'recent',
          keepAlive: true
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

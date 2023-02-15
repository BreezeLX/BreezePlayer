import LxRequest from '../index';
//最近播放的音乐
export async function getRecentSongs(limit = 100) {
  const data = await LxRequest.request({
    url: '/record/recent/song',
    method: 'get',
    params: {
      limit
    }
  });
  return data;
}
//最近播放的视频
export async function getRecentVideo(limit = 100) {
  const data = await LxRequest.request({
    url: '/record/recent/video',
    method: 'get',
    params: {
      limit
    }
  });
  return data;
}

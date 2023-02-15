import LxRequest from '../index';
//获取歌单详情
export async function getPlayListDetail(id: number, s: number = 8) {
  const { playlist } = await LxRequest.request({
    url: `/playlist/detail?id=${id}&s=${s}`,
    method: 'get'
  });
  return playlist;
}

// 获取歌单音乐
export async function getPlayListTrackAll(id: number) {
  console.log('拿到的蚕食', id);
  const data = await LxRequest.request({
    url: `playlist/track/all?id=${id}`,
    method: 'get'
  });
  return data?.songs;
}

//获取歌单分类
export async function getPlaylistHighqualityTags() {
  const { tags } = await LxRequest.request({
    url: 'playlist/highquality/tags',
    method: 'get'
  });
  return tags;
}

// 获取精品歌单
export async function getTopPlaylistHighquality(params?: {
  limit?: number;
  before?: number;
  cat: string;
}) {
  return await LxRequest.request({
    url: 'top/playlist/highquality',
    params
  });
}

// 获取用户歌单
export async function getUserMusicList(obj) {
  console.log(obj);
  return await LxRequest.request({
    url: '/user/playlist',
    params: {
      uid: obj.uid,
      limit: obj.limit || 30,
      offset: obj.offset || 0
    }
  });
}

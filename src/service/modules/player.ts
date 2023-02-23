import LxRequest from '../index';

//获取音乐url
export function getSongUrl(id: number) {
  return LxRequest.request({
    url: `/song/url?id=${id}`,
    method: 'get'
  });
}

// 获取歌曲详情
export function getDetail(id: number) {
  return LxRequest.request({
    url: `/song/detail?ids=${id}`,
    method: 'get'
  });
}

// 获取歌词
export function getSongWords(id: number) {
  return LxRequest.request({
    url: '/lyric/new',
    method: 'get',
    params: {
      id
    }
  });
}

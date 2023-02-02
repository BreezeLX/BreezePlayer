import LxRequest from '../index';
//获取歌手分类列表
export async function getArtistList(pageData: {
  type: number;
  area: number;
  initial: string;
  page: number;
  limit: number;
}) {
  const { artists } = await LxRequest.request({
    url: '/artist/list',
    method: 'get',
    params: {
      type: pageData.type,
      area: pageData.area,
      initial: pageData.initial,
      limit: pageData.limit,
      offset: (pageData.page - 1) * pageData.limit
    }
  });
  return artists;
}

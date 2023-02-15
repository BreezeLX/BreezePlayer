export interface ICommentArg {
  id: any;
  mvid?: any;
  pageNo?: number;
  pageSize?: number;
  sortType?: number;
  cursor?: number;
}

export interface ISendCommentArg {
  id: any;
  t: 1 | 2;
  mvid?: any;
  content: string;
  commentId?: string | number;
}

export interface IFloorCommentArg {
  mvid?: any;
  id: any;
  parentCommentId: string | number;
  limit?: number;
  time?: number;
}

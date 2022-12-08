import { AxiosPromise } from 'axios';

import { Api } from './Api';

export type AddCommentReq = {
  comment: string;
  postId: string;
  wallId?: string;
};

export type DeleteCommentReq = {
  id: string;
};

export class Comments {
  static wallAddPostComment(body: AddCommentReq): AxiosPromise<any> {
    return Api.post('wall-comments', body);
  }

  static wallDeletePostComment({ id }: DeleteCommentReq): AxiosPromise<any> {
    return Api.delete(`wall-comments/${id}`);
  }

  static wallAddNewsComment(body: AddCommentReq): AxiosPromise<any> {
    return Api.post('news-comments', body);
  }

  static wallDeleteNewsComment({ id }: DeleteCommentReq): AxiosPromise<any> {
    return Api.delete(`news-comments/${id}`);
  }

  static wallAddSocialComment(body: AddCommentReq): AxiosPromise<any> {
    return Api.post('social-comments', body);
  }

  static wallDeleteSocialComment({ id }: DeleteCommentReq): AxiosPromise<any> {
    return Api.delete(`social-comments/${id}`);
  }

  static wallAddVideoComment(body: AddCommentReq): AxiosPromise<any> {
    return Api.post('video-comments', body);
  }

  static wallDeleteVideoComment({ id }: DeleteCommentReq): AxiosPromise<any> {
    return Api.delete(`video-comments/${id}`);
  }
}

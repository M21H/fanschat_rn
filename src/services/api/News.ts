import { AxiosPromise } from 'axios';

import { Api } from './Api';

export type GetOneNewsReq = { id: string };
export type GetNewsCommentsReq = { id: string };
export type UpdateNewsLikesReq = { id: string; like: boolean };
export type AddNewsCommentReq = {
  comment: string;
  postId: string;
  wallId: string;
};

export class News {
  static getAll(): AxiosPromise<any> {
    return Api.get('news?page=1&perPage=20');
  }

  static getOne({ id }: GetOneNewsReq): AxiosPromise<any> {
    return Api.get(`news/${id}`);
  }

  static getComments({ id }: GetNewsCommentsReq): AxiosPromise<any> {
    return Api.get(`news/${id}/comments?page=1&perPage=10`);
  }

  static updateLikes({ id, like }: UpdateNewsLikesReq): AxiosPromise<any> {
    return Api.put(`news/${id}/likes`, { like });
  }
}

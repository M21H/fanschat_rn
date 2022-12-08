import { AxiosPromise } from 'axios';

import { Api } from './Api';

export type GetOnePostReq = { id: string };
export type GetPostCommentsReq = { id: string };
export type UpdatePostLikesReq = { id: string; like: boolean };

export class Posts {
  static getOne({ id }: GetOnePostReq): AxiosPromise<any> {
    return Api.get(`posts/${id}`);
  }

  static getComments({ id }: GetPostCommentsReq): AxiosPromise<any> {
    return Api.get(`posts/${id}/comments?page=1&perPage=10`);
  }

  static updateLikes({ id, like }: UpdatePostLikesReq): AxiosPromise<any> {
    return Api.put(`posts/${id}/likes`, { like });
  }
}

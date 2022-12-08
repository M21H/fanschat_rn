import { AxiosPromise } from 'axios';

import { Api } from './Api';

export type GetOneVideoReq = { id: string };
export type GetVideoCommentsReq = { id: string };
export type UpdateVideoLikesReq = { id: string; like: boolean };

export class Videos {
  static getAll(): AxiosPromise<any> {
    return Api.get(`videos?page=1&perPage=18`);
  }

  static getOne({ id }: GetOneVideoReq): AxiosPromise<any> {
    return Api.get(`videos/${id}`);
  }

  static getComments({ id }: GetVideoCommentsReq): AxiosPromise<any> {
    return Api.get(`videos/${id}/comments?page=1&perPage=10`);
  }

  static updateLikes({ id, like }: UpdateVideoLikesReq): AxiosPromise<any> {
    return Api.put(`videos/${id}/likes`, { like });
  }
}

import { AxiosPromise } from 'axios';

import { Api } from './Api';

export type GetOneSocialReq = { id: string };
export type GetSocialCommentsReq = { id: string };
export type UpdateSocialLikesReq = { id: string; like: boolean };

export class Social {
  static getOne({ id }: GetOneSocialReq): AxiosPromise<any> {
    return Api.get(`social/${id}`);
  }

  static getAll(): AxiosPromise<any> {
    return Api.get('social');
  }

  static getComments({ id }: GetSocialCommentsReq): AxiosPromise<any> {
    return Api.get(`social/${id}/comments?page=1&perPage=10`);
  }

  static updateLikes({ id, like }: UpdateSocialLikesReq): AxiosPromise<any> {
    return Api.put(`social/${id}/likes`, { like });
  }
}

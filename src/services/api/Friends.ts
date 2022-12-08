import { AxiosPromise } from 'axios';

import { ApiResponseList, IFriend } from '~/models';

import { Api } from './Api';

export type GetAllMutualFriendsReq = { id: string };
export type GetAllFriendsReq = { page?: number; perPage?: number };

export type GetAllMutualFriendsRes = ApiResponseList<IFriend[]>;
export type GetAllFriendRes = ApiResponseList<IFriend[]>;

export class Friends {
  static getAll(param: GetAllFriendsReq): AxiosPromise<GetAllFriendRes> {
    const { page = 1, perPage = 21 } = param;
    return Api.get(`/friends?page=${page}&perPage=${perPage}`);
  }

  static getAllMutual({ id }: GetAllMutualFriendsReq): AxiosPromise<GetAllMutualFriendsRes> {
    return Api.get(`/friends/${id}/mutual`);
  }

  static deleteOne(id: number): AxiosPromise {
    return Api.delete(`/friends/${id}`);
  }
}

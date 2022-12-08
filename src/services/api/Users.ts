import { AxiosPromise } from 'axios';

import { IUser } from '~/models';

import { Api } from './Api';

export type GetAllUsersReq = { search?: string; page?: number; perPage?: number };

export type GetOneUserReq = { id: string };
export type GetOneUserRes = IUser;

export class Users {
  static getAll({
    search,
    page = 1,
    perPage = 21,
  }: GetAllUsersReq): AxiosPromise<{ count: number; data: IUser }> {
    return Api.get(
      `users?page=${page}&perPage=${perPage}${
        search ? `&displayName=${search}` : ''
      }&isAdmin=false`,
    );
  }

  static getOne({ id }: GetOneUserReq): AxiosPromise<GetOneUserRes> {
    return Api.get(`users/${id}`);
  }
}

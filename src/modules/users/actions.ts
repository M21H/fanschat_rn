import { createAction } from '@reduxjs/toolkit';

import { IUser } from '~/models';
import { GetAllUsersReq, GetOneUserReq, GetOneUserRes } from '~/services/api/Users';
import { createAsyncAction, createAsyncType } from '~/store/utils/index';

export const TYPES = {
  getAllUsers: createAsyncType('user/GET_ALL_USERS'),
  getOneUser: createAsyncType('users/GET_ONE_USER'),
  searchUser: 'user/SEARCH_USER',
};

export const getAllUsers = createAsyncAction<
  GetAllUsersReq,
  { data: IUser[]; count: number },
  void
>(TYPES.getAllUsers);
export const getOneUser = createAsyncAction<GetOneUserReq, GetOneUserRes, void>(TYPES.getOneUser);

export const setSearchUser = createAction<string>(TYPES.searchUser);

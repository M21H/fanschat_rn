import {
  GetAllFriendRes,
  GetAllFriendsReq,
  GetAllMutualFriendsReq,
  GetAllMutualFriendsRes,
} from '~/services/api/Friends';
import { createAsyncAction, createAsyncType } from '~/store/utils';

export const TYPES = {
  getAllFriends: createAsyncType('friends/GET_ALL_FRIENDS'),
  getMutualFriends: createAsyncType('friends/GET_MUTUAL_FRIENDS'),
  setPage: 'friends/SET_FRIENDS_PAGE',
};

export const getAllFriends = createAsyncAction<GetAllFriendsReq, GetAllFriendRes, void>(
  TYPES.getAllFriends,
);
export const getMutualFriends = createAsyncAction<
  GetAllMutualFriendsReq,
  GetAllMutualFriendsRes,
  void
>(TYPES.getMutualFriends);

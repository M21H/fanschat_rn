import { createAction } from '@reduxjs/toolkit';

import { AddCommentReq, DeleteCommentReq } from '~/services/api/Comments';
import { GetOneNewsReq, UpdateNewsLikesReq } from '~/services/api/News';
import { UpdatePostLikesReq } from '~/services/api/Posts';
import { GetOneSocialReq, UpdateSocialLikesReq } from '~/services/api/Social';
import { GetOneVideoReq, UpdateVideoLikesReq } from '~/services/api/Videos';
import { createAsyncAction, createAsyncType } from '~/store/utils';

import { IComment, IFeedSetup, IPost, ITicker } from './types';

export const TYPES = {
  getFeed: createAsyncType('feed/GET_FEED'),

  getAllNews: createAsyncType('feed/GET_ALL_NEWS'),
  getOneNews: createAsyncType('feed/GET_ONE_NEWS'),
  updateNewsLikes: createAsyncType('feed/UPDATE_NEWS_LIKES'),
  addNewsComment: createAsyncType('feed/ADD_NEWS_COMMENT'),
  deleteNewsComment: createAsyncType('feed/DELETE_NEWS_COMMENT'),

  getAllSocial: createAsyncType('feed/GET_ALL_SOCIAL'),
  getOneSocial: createAsyncType('feed/GET_ONE_SOCIAL'),
  updateSocialLikes: createAsyncType('feed/UPDATE_SOCIAL_LIKES'),
  addSocialComment: createAsyncType('feed/ADD_SOCIAL_COMMENT'),
  deleteSocialComment: createAsyncType('feed/DELETE_SOCIAL_COMMENT'),

  setCurrentItem: 'feed/SET_CURRENT_ITEM',
  setCurrentItemComments: 'feed/SET_CURRENT_ITEM_COMMENTS',

  getAllVideos: createAsyncType('feed/GET_ALL_VIDEOS'),
  getOneVideo: createAsyncType('feed/GET_ONE_VIDEO'),
  updateVideoLikes: createAsyncType('feed/UPDATE_VIDEO_LIKES'),
  addVideoComment: createAsyncType('feed/ADD_VIDEO_COMMENT'),
  deleteVideoComment: createAsyncType('feed/DELETE_VIDEO_COMMENT'),

  getOnePost: createAsyncType('feed/GET_ONE_POST'),
  updatePostLikes: createAsyncType('feed/UPDATE_POST_LIKES'),
  addPostComment: createAsyncType('feed/ADD_POST_COMMENT'),
  deletePostComment: createAsyncType('feed/DELETE_POST_COMMENT'),
};

// feed
export const getFeed = createAsyncAction<void, { ticker: ITicker; feedSetup: IFeedSetup }, void>(
  TYPES.getFeed,
);

// news
export const getAllNews = createAsyncAction<void, { count: number; data: IPost[] }, void>(
  TYPES.getAllNews,
);
export const getOneNews = createAsyncAction<
  GetOneNewsReq,
  { news: IPost; comments: IComment[] },
  void
>(TYPES.getOneNews);
export const updateNewsLikes = createAsyncAction<UpdateNewsLikesReq, { news: IPost }, void>(
  TYPES.updateNewsLikes,
);
export const addNewsComment = createAsyncAction<
  Omit<AddCommentReq, 'wallId'>,
  { post: IPost; comment: IComment },
  void
>(TYPES.addNewsComment);
export const deleteNewsComment = createAsyncAction<DeleteCommentReq, DeleteCommentReq, void>(
  TYPES.deleteNewsComment,
);

// social
export const getAllSocial = createAsyncAction<void, { count: number; data: IPost[] }, void>(
  TYPES.getAllSocial,
);
export const getOneSocial = createAsyncAction<
  GetOneSocialReq,
  { social: IPost; comments: IComment[] },
  void
>(TYPES.getOneSocial);
export const updateSocialLikes = createAsyncAction<UpdateSocialLikesReq, { social: IPost }, void>(
  TYPES.updateSocialLikes,
);
export const addSocialComment = createAsyncAction<
  Omit<AddCommentReq, 'wallId'>,
  { post: IPost; comment: IComment },
  void
>(TYPES.addSocialComment);
export const deleteSocialComment = createAsyncAction<DeleteCommentReq, DeleteCommentReq, void>(
  TYPES.deleteSocialComment,
);

// video
export const getAllVideos = createAsyncAction<void, { count: number; data: IPost[] }, void>(
  TYPES.getAllVideos,
);
export const getOneVideo = createAsyncAction<
  GetOneVideoReq,
  { video: IPost; comments: IComment[] },
  void
>(TYPES.getOneVideo);
export const updateVideoLikes = createAsyncAction<UpdateVideoLikesReq, { video: IPost }, void>(
  TYPES.updateVideoLikes,
);
export const addVideoComment = createAsyncAction<
  Omit<AddCommentReq, 'wallId'>,
  { post: IPost; comment: IComment },
  void
>(TYPES.addVideoComment);
export const deleteVideoComment = createAsyncAction<DeleteCommentReq, DeleteCommentReq, void>(
  TYPES.deleteVideoComment,
);

// post
export const getOnePost = createAsyncAction<
  { id: string },
  { post: IPost; comments: IComment[] },
  void
>(TYPES.getOnePost);
export const updatePostLikes = createAsyncAction<UpdatePostLikesReq, { post: IPost }, void>(
  TYPES.updatePostLikes,
);
export const addPostComment = createAsyncAction<
  AddCommentReq,
  { post: IPost; comment: IComment },
  void
>(TYPES.addPostComment);

export const deletePostComment = createAsyncAction<DeleteCommentReq, DeleteCommentReq, void>(
  TYPES.deletePostComment,
);

// common actions for each feed content item
export const setSelectedItem = createAction(TYPES.setCurrentItem);
export const setSelectedItemComments = createAction(TYPES.setCurrentItemComments);

import { createReducer } from '@reduxjs/toolkit';

import {
  addNewsComment,
  addPostComment,
  addSocialComment,
  addVideoComment,
  deleteNewsComment,
  deletePostComment,
  deleteSocialComment,
  deleteVideoComment,
  getAllNews,
  getAllSocial,
  getAllVideos,
  getFeed,
  getOneNews,
  getOnePost,
  getOneSocial,
  getOneVideo,
  updateNewsLikes,
  updatePostLikes,
  updateSocialLikes,
  updateVideoLikes,
} from './actions';
import { IComment, IFeedData, IFeedSetup, IPost, ITicker } from './types';

type State = {
  ticker: Nullable<ITicker>;
  feedSetup: IFeedSetup[];
  posts: IPost[];
  selectedItem: {
    data: Nullable<IFeedData>;
    comments: IComment[];
  };
};

export const initialState: State = {
  ticker: null,
  feedSetup: [],
  posts: [],
  selectedItem: {
    data: null,
    comments: [],
  },
};

export const feedReducer = createReducer(initialState, builder =>
  builder
    .addCase(getFeed.success, (state, { payload }) => {
      state.ticker = payload.ticker;
      // @ts-ignore
      state.feedSetup = payload.feedSetup;
    })

    // ======> POST <====== //
    .addCase(getOnePost.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.post;
      state.selectedItem.comments = payload.comments;
    })
    .addCase(updatePostLikes.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.post;
    })
    .addCase(addPostComment.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.post;
      state.selectedItem.comments.unshift(payload.comment);
    })
    .addCase(deletePostComment.success, (state, { payload }) => {
      state.selectedItem.comments = state.selectedItem.comments.filter(
        comment => comment._id !== payload.id,
      );
    })
    // ======> NEWS <====== //
    .addCase(getAllNews.success, (state, { payload }) => {
      state.posts = payload.data;
    })
    .addCase(getOneNews.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.news;
      state.selectedItem.comments = payload.comments;
    })
    .addCase(updateNewsLikes.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.news;
    })
    .addCase(addNewsComment.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.post;
      state.selectedItem.comments.unshift(payload.comment);
    })
    .addCase(deleteNewsComment.success, (state, { payload }) => {
      state.selectedItem.comments = state.selectedItem.comments.filter(
        comment => comment._id !== payload.id,
      );
    })

    // ======> SOCIAL <====== //
    .addCase(getAllSocial.success, (state, { payload }) => {
      state.posts = payload.data;
    })
    .addCase(getOneSocial.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.social;
      state.selectedItem.comments = payload.comments;
    })
    .addCase(updateSocialLikes.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.social;
    })
    .addCase(addSocialComment.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.post;
      state.selectedItem.comments.unshift(payload.comment);
    })
    .addCase(deleteSocialComment.success, (state, { payload }) => {
      state.selectedItem.comments = state.selectedItem.comments.filter(
        comment => comment._id !== payload.id,
      );
    })

    // ======> VIDEO <====== //
    .addCase(getAllVideos.success, (state, { payload }) => {
      state.posts = payload.data;
    })
    .addCase(getOneVideo.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.video;
      state.selectedItem.comments = payload.comments;
    })
    .addCase(updateVideoLikes.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.video;
    })
    .addCase(addVideoComment.success, (state, { payload }) => {
      // @ts-ignore
      state.selectedItem.data = payload.post;
      state.selectedItem.comments.unshift(payload.comment);
    })
    .addCase(deleteVideoComment.success, (state, { payload }) => {
      state.selectedItem.comments = state.selectedItem.comments.filter(
        comment => comment._id !== payload.id,
      );
    }),
);

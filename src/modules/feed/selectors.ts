import { createSelector } from '@reduxjs/toolkit';

import { createErrorSelector } from '~/common/@errors/utils';
import { createLoadingSelector } from '~/common/@loadings/utils';
import { RootState } from '~/store/types';

import { TYPES } from './actions';

// errors selectors
export const selectIsFeedLoadingError = createErrorSelector(TYPES.getFeed.TYPE);

// loading selectors
export const selectIsFeedLoading = createLoadingSelector(TYPES.getFeed.TYPE);

// ===> POST <=== //
export const selectIsOnePostLoading = createLoadingSelector(TYPES.getOnePost.TYPE);
export const selectIsPostLikeUpdating = createLoadingSelector(TYPES.updatePostLikes.TYPE);
export const selectIsPostCommentDeleting = createLoadingSelector(TYPES.deletePostComment.TYPE);

// ===> NEWS <=== //
export const selectIsAllNewsLoading = createLoadingSelector(TYPES.getAllNews.TYPE);
export const selectIsOneNewsLoading = createLoadingSelector(TYPES.getOneNews.TYPE);
export const selectIsNewsLikeUpdating = createLoadingSelector(TYPES.updateNewsLikes.TYPE);
export const selectIsNewsCommentDeleting = createLoadingSelector(TYPES.deleteNewsComment.TYPE);

// ===> SOCIAL <=== //
export const selectIsAllSocialLoading = createLoadingSelector(TYPES.getAllSocial.TYPE);
export const selectIsOneSocialLoading = createLoadingSelector(TYPES.getOneSocial.TYPE);
export const selectIsSocialLikeUpdating = createLoadingSelector(TYPES.updateSocialLikes.TYPE);
export const selectIsSocialCommentDeleting = createLoadingSelector(TYPES.deleteSocialComment.TYPE);

// ===> VIDEO <=== //
export const selectIsAllVideoLoading = createLoadingSelector(TYPES.getAllVideos.TYPE);
export const selectIsOneVideoLoading = createLoadingSelector(TYPES.getOneVideo.TYPE);
export const selectIsVideoLikeUpdating = createLoadingSelector(TYPES.updateVideoLikes.TYPE);
export const selectIsVideoCommentDeleting = createLoadingSelector(TYPES.deleteVideoComment.TYPE);

const selfModule = (state: RootState): RootState['feed'] => state.feed;

export const selectTickerMessages = createSelector(selfModule, data => data.ticker?.messages);

export const selectFeedSetup = createSelector(selfModule, data => data.feedSetup);

export const selectPosts = createSelector(selfModule, data => data.posts);

// export const selectSocial = createSelector(selfModule, social => social.social);
// export const selectNews = createSelector(selfModule, news => news.news);

export const selectSelectedItem = createSelector(selfModule, data => data.selectedItem);

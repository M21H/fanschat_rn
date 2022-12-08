import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';

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
} from '../actions';
import { getFeedSaga } from './FeedSaga';
import {
  addNewsCommentSaga,
  deleteNewsCommentSaga,
  getAllNewsSaga,
  getOneNewsSaga,
  updateNewsLikesSaga,
} from './NewsSaga';
import {
  addPostCommentSaga,
  deletePostCommentSaga,
  getPostSaga,
  updatePostLikesSaga,
} from './PostSaga';
import {
  addSocialCommentSaga,
  deleteSocialCommentSaga,
  getAllSocialSaga,
  getOneSocialSaga,
  updateSocialLikesSaga,
} from './SocialSaga';
import {
  addVideoCommentSaga,
  deleteVideoCommentSaga,
  getAllVideosSaga,
  getOneVideoSaga,
  updateVideoLikesSaga,
} from './VideoSaga';

export function* watchFeed(): SagaIterator {
  yield takeLatest(getFeed.request, getFeedSaga);

  yield takeLatest(getAllNews.request, getAllNewsSaga);
  yield takeLatest(getOneNews.request, getOneNewsSaga);
  yield takeLatest(updateNewsLikes.request, updateNewsLikesSaga);
  yield takeLatest(addNewsComment.request, addNewsCommentSaga);
  yield takeLatest(deleteNewsComment.request, deleteNewsCommentSaga);

  yield takeLatest(getAllSocial.request, getAllSocialSaga);
  yield takeLatest(getOneSocial.request, getOneSocialSaga);
  yield takeLatest(updateSocialLikes.request, updateSocialLikesSaga);
  yield takeLatest(addSocialComment.request, addSocialCommentSaga);
  yield takeLatest(deleteSocialComment.request, deleteSocialCommentSaga);

  yield takeLatest(getOnePost.request, getPostSaga);
  yield takeLatest(updatePostLikes.request, updatePostLikesSaga);
  yield takeLatest(addPostComment.request, addPostCommentSaga);
  yield takeLatest(deletePostComment.request, deletePostCommentSaga);

  yield takeLatest(getAllVideos.request, getAllVideosSaga);
  yield takeLatest(getOneVideo.request, getOneVideoSaga);
  yield takeLatest(updateVideoLikes.request, updateVideoLikesSaga);
  yield takeLatest(addVideoComment.request, addVideoCommentSaga);
  yield takeLatest(deleteVideoComment.request, deleteVideoCommentSaga);
}

import { SagaIterator } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Comments } from '~/services/api/Comments';
import { Videos } from '~/services/api/Videos';
import { isAxiosError } from '~/utils/apiErrors';

import {
  addVideoComment,
  deleteVideoComment,
  getAllVideos,
  getOneVideo,
  updateVideoLikes,
} from '../actions';

export function* getAllVideosSaga(): SagaIterator {
  try {
    yield put(getAllVideos.pending());
    const { data } = yield call(Videos.getAll);
    if (data) {
      yield put(getAllVideos.success({ count: data.count, data: data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getAllVideos.failure }));
    }
  }
}

export function* getOneVideoSaga({
  payload,
}: ReturnType<typeof getOneVideo.request>): SagaIterator {
  try {
    yield put(getOneVideo.pending());
    const [video, comments] = yield all([
      call(Videos.getOne, payload),
      call(Videos.getComments, payload),
    ]);

    if (video.data) {
      yield put(getOneVideo.success({ video: video.data, comments: comments.data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getOneVideo.failure }));
    }
  }
}

export function* updateVideoLikesSaga({
  payload,
}: ReturnType<typeof updateVideoLikes.request>): SagaIterator {
  try {
    yield put(updateVideoLikes.pending());
    const { data } = yield call(Videos.updateLikes, payload);
    if (data) {
      yield put(updateVideoLikes.success({ video: data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: updateVideoLikes.failure }));
    }
  }
}

export function* addVideoCommentSaga({
  payload,
}: ReturnType<typeof addVideoComment.request>): SagaIterator {
  try {
    yield put(addVideoComment.pending());
    const {
      data: { post, comment },
    } = yield call(Comments.wallAddVideoComment, payload);
    if (post && comment) {
      yield put(addVideoComment.success({ post, comment }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: addVideoComment.failure }));
    }
  }
}
export function* deleteVideoCommentSaga({
  payload,
}: ReturnType<typeof deleteVideoComment.request>): SagaIterator {
  try {
    yield put(deleteVideoComment.pending());
    yield call(Comments.wallDeleteVideoComment, payload);
    yield put(deleteVideoComment.success({ id: payload.id }));
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: deleteVideoComment.failure }));
    }
  }
}

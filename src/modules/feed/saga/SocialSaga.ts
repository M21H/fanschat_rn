import { SagaIterator } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Comments } from '~/services/api/Comments';
import { Social } from '~/services/api/Social';
import { isAxiosError } from '~/utils/apiErrors';

import {
  addSocialComment,
  deleteSocialComment,
  getAllSocial,
  getOneSocial,
  updateSocialLikes,
} from '../actions';

export function* getAllSocialSaga(): SagaIterator {
  try {
    yield put(getAllSocial.pending());
    const { data } = yield call(Social.getAll);
    if (data) {
      yield put(getAllSocial.success({ count: data.count, data: data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getAllSocial.request }));
    }
  }
}

export function* getOneSocialSaga({
  payload,
}: ReturnType<typeof getOneSocial.request>): SagaIterator {
  try {
    yield put(getOneSocial.pending());
    const [social, comments] = yield all([
      call(Social.getOne, payload),
      call(Social.getComments, payload),
    ]);

    if (social.data) {
      yield put(getOneSocial.success({ social: social.data, comments: comments.data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getOneSocial.failure }));
    }
  }
}

export function* updateSocialLikesSaga({
  payload,
}: ReturnType<typeof updateSocialLikes.request>): SagaIterator {
  try {
    yield put(updateSocialLikes.pending());
    const { data } = yield call(Social.updateLikes, payload);
    if (data) {
      yield put(updateSocialLikes.success({ social: data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: updateSocialLikes.failure }));
    }
  }
}

export function* addSocialCommentSaga({
  payload,
}: ReturnType<typeof addSocialComment.request>): SagaIterator {
  try {
    yield put(addSocialComment.pending());
    const {
      data: { post, comment },
    } = yield call(Comments.wallAddSocialComment, payload);
    if (post && comment) {
      yield put(addSocialComment.success({ post, comment }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: addSocialComment.failure }));
    }
  }
}
export function* deleteSocialCommentSaga({
  payload,
}: ReturnType<typeof deleteSocialComment.request>): SagaIterator {
  try {
    yield put(deleteSocialComment.pending());
    yield call(Comments.wallDeleteSocialComment, payload);
    yield put(deleteSocialComment.success({ id: payload.id }));
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: deleteSocialComment.failure }));
    }
  }
}

import { SagaIterator } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Comments } from '~/services/api/Comments';
import { News } from '~/services/api/News';
import { isAxiosError } from '~/utils/apiErrors';

import {
  addNewsComment,
  deleteNewsComment,
  getAllNews,
  getOneNews,
  updateNewsLikes,
} from '../actions';

export function* getAllNewsSaga(): SagaIterator {
  try {
    yield put(getAllNews.pending());
    const { data } = yield call(News.getAll);
    if (data) {
      yield put(getAllNews.success({ count: data.count, data: data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getAllNews.failure }));
    }
  }
}
export function* getOneNewsSaga({ payload }: ReturnType<typeof getOneNews.request>): SagaIterator {
  try {
    yield put(getOneNews.pending());
    const [news, comments] = yield all([
      call(News.getOne, payload),
      call(News.getComments, payload),
    ]);

    if (news.data) {
      yield put(getOneNews.success({ news: news.data, comments: comments.data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getOneNews.failure }));
    }
  }
}
export function* updateNewsLikesSaga({
  payload,
}: ReturnType<typeof updateNewsLikes.request>): SagaIterator {
  try {
    yield put(updateNewsLikes.pending());
    const { data } = yield call(News.updateLikes, payload);
    if (data) {
      yield put(updateNewsLikes.success({ news: data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: updateNewsLikes.failure }));
    }
  }
}
export function* addNewsCommentSaga({
  payload,
}: ReturnType<typeof addNewsComment.request>): SagaIterator {
  try {
    yield put(addNewsComment.pending());
    const {
      data: { post, comment },
    } = yield call(Comments.wallAddNewsComment, payload);
    if (post && comment) {
      yield put(addNewsComment.success({ post, comment }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: addNewsComment.failure }));
    }
  }
}
export function* deleteNewsCommentSaga({
  payload,
}: ReturnType<typeof deleteNewsComment.request>): SagaIterator {
  try {
    yield put(deleteNewsComment.pending());
    yield call(Comments.wallDeleteNewsComment, payload);
    yield put(deleteNewsComment.success({ id: payload.id }));
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: deleteNewsComment.failure }));
    }
  }
}

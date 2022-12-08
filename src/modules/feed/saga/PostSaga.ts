import { SagaIterator } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Comments } from '~/services/api/Comments';
import { Posts } from '~/services/api/Posts';
import { isAxiosError } from '~/utils/apiErrors';

import { addPostComment, deletePostComment, getOnePost, updatePostLikes } from '../actions';

export function* getPostSaga({ payload }: ReturnType<typeof getOnePost.request>): SagaIterator {
  try {
    yield put(getOnePost.pending());
    const [post, comments] = yield all([
      call(Posts.getOne, payload),
      call(Posts.getComments, payload),
    ]);

    if (post.data) {
      yield put(getOnePost.success({ post: post.data, comments: comments.data.data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getOnePost.failure }));
    }
  }
}
export function* updatePostLikesSaga({
  payload,
}: ReturnType<typeof updatePostLikes.request>): SagaIterator {
  try {
    yield put(updatePostLikes.pending());
    const { data } = yield call(Posts.updateLikes, payload);

    if (data) {
      yield put(updatePostLikes.success({ post: data }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: updatePostLikes.failure }));
    }
  }
}
export function* addPostCommentSaga({
  payload,
}: ReturnType<typeof addPostComment.request>): SagaIterator {
  try {
    yield put(addPostComment.pending());
    const {
      data: { post, comment },
    } = yield call(Comments.wallAddPostComment, payload);

    if (post && comment) {
      yield put(addPostComment.success({ post, comment }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: addPostComment.failure }));
    }
  }
}
export function* deletePostCommentSaga({
  payload,
}: ReturnType<typeof deletePostComment.request>): SagaIterator {
  try {
    yield put(deletePostComment.pending());
    yield call(Comments.wallDeletePostComment, payload);
    yield put(deletePostComment.success({ id: payload.id }));
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: deletePostComment.failure }));
    }
  }
}

import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Friends } from '~/services/api/Friends';
import { isAxiosError } from '~/utils/apiErrors';

import { getAllFriends, getMutualFriends } from './actions';

function* getAllFriendsSaga({ payload }: ReturnType<typeof getAllFriends.request>): SagaIterator {
  try {
    yield put(getAllFriends.pending());

    const { data } = yield call(Friends.getAll, payload);

    if (data) {
      yield put(getAllFriends.success(data));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getAllFriends.failure }));
    }
  }
}
function* getMutualFriendsSaga({
  payload,
}: ReturnType<typeof getMutualFriends.request>): SagaIterator {
  try {
    yield put(getMutualFriends.pending());

    const { data } = yield call(Friends.getAllMutual, payload);

    if (data) {
      yield put(getMutualFriends.success(data));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getMutualFriends.failure }));
    }
  }
}

export function* watchFriends(): SagaIterator {
  yield takeLatest(getAllFriends.request, getAllFriendsSaga);
  yield takeLatest(getMutualFriends.request, getMutualFriendsSaga);
}

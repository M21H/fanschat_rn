import { SagaIterator } from 'redux-saga';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Users } from '~/services/api/Users';
import { isAxiosError } from '~/utils/apiErrors';

import { getAllUsers, getOneUser } from './actions';

function* getAllUsersSaga({ payload }: ReturnType<typeof getAllUsers.request>): SagaIterator {
  try {
    yield put(getAllUsers.pending());

    const { data } = yield call(Users.getAll, payload);
    if (data) {
      yield put(getAllUsers.success(data));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getAllUsers.failure }));
    }
  }
}

function* getOneUserSaga({ payload }: ReturnType<typeof getOneUser.request>): SagaIterator {
  try {
    yield put(getOneUser.pending());
    const { data } = yield call(Users.getOne, payload);
    if (data) {
      yield put(getOneUser.success(data));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getOneUser.failure }));
    }
  }
}

export function* watchUsers(): SagaIterator {
  yield debounce(400, getAllUsers.request, getAllUsersSaga);
  yield takeLatest(getOneUser.request, getOneUserSaga);
}

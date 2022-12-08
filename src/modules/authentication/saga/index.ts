import Toast from 'react-native-toast-message';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'typed-redux-saga';

import { processRequestError } from '~/common/@errors/actions';
import { resetStore } from '~/modules/app/actions';
import { Auth } from '~/services/api/Auth';
import { Location } from '~/services/api/Location';
import { isAxiosError } from '~/utils/apiErrors';

import { getLocation, logIn, logOut, register } from '../actions';

function* logInSaga({ payload }: ReturnType<typeof logIn.request>): SagaIterator {
  try {
    yield put(logIn.pending());
    const { data } = yield call(Auth.login, payload);
    if (data) {
      yield put(logIn.success(data));
      Toast.show({
        type: 'success',
        text1: 'Login successfully',
      });
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: logIn.failure }));
    }
  }
}

function* registerSaga({ payload }: ReturnType<typeof register.request>): SagaIterator {
  try {
    yield put(register.pending());
    const { data } = yield call(Auth.register, payload);

    yield put(register.success(data));

    Toast.show({
      type: 'success',
      text1: 'Registration successfully',
    });
  } catch (e) {
    const error = isAxiosError(e);

    if (error) {
      yield put(processRequestError({ error, failAction: register.failure }));
    }
  }
}

function* logOutSaga(): SagaIterator {
  try {
    yield put(logOut.pending());
    const { data } = yield call(Auth.logout);
    if (data.success) {
      yield put(logOut.success());
      yield put(resetStore());
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: logOut.failure }));
    }
  }
}

function* getLocationSaga(): SagaIterator {
  try {
    yield put(getLocation.pending());
    const { data } = yield call(Location.getLocation);
    if (data) {
      yield put(getLocation.success(data));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getLocation.failure }));
    }
  }
}

export function* watchAuth(): SagaIterator {
  yield* takeLatest(logOut.request, logOutSaga);
  yield* takeLatest(register.request, registerSaga);
  yield* takeLatest(logIn.request, logInSaga);
  yield* takeLatest(getLocation.request, getLocationSaga);
}

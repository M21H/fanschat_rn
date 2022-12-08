import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'typed-redux-saga';

import { processRequestError } from '~/common/@errors/actions';
import { Notifications } from '~/services/api/Notifications';
import { isAxiosError } from '~/utils/apiErrors';

import { getAllNotifications } from '../actions';

function* getAllNotificationsSaga({
  payload,
}: ReturnType<typeof getAllNotifications.request>): SagaIterator {
  try {
    yield put(getAllNotifications.pending());
    const { data } = yield call(Notifications.getAll, payload);
    if (data) {
      yield put(getAllNotifications.success({ data: data.data, count: data.count }));
    }
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getAllNotifications.failure }));
    } else {
      yield put(getAllNotifications.failure());
    }
  }
}

export function* watchNotifications(): SagaIterator {
  yield* takeLatest(getAllNotifications.request, getAllNotificationsSaga);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from 'react-native-toast-message';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

import { Logger } from '~/utils/logger';

import { processRequestError } from './actions';

const getFirstErrorMessage = (data: any, fieldName?: string): any => {
  if (Array.isArray(data)) {
    // eslint-disable-next-line no-restricted-syntax, no-unreachable-loop
    for (const arrayItem of data) {
      return getFirstErrorMessage(arrayItem, fieldName);
    }
  } else if (typeof data === 'object') {
    // eslint-disable-next-line no-restricted-syntax,guard-for-in, no-unreachable-loop
    for (const objectKey in data) {
      return getFirstErrorMessage(data[objectKey], objectKey);
    }
  } else {
    return {
      message: data,
      name: fieldName,
    };
  }
  return null;
};

function* processRequestErrorSaga({
  payload: { error, failAction },
}: ReturnType<typeof processRequestError>): SagaIterator {
  const errors: { message: string; name?: string } = { message: 'Request failed!' };

  if (error.response) {
    const { data } = error.response;

    if (data) {
      errors.message = getFirstErrorMessage(data).message;
      errors.name = getFirstErrorMessage(data).name;
    } else if (!data && error.response.status === 0) {
      errors.message = 'Network error';
    } else {
      errors.message = 'Server error';
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    errors.message = 'Something went wrong';
  }

  Toast.show({
    type: 'error',
    text1: errors.message,
  });

  Logger.log('api error response [error?.response?.data]', { response: error?.response?.data });
  Logger.log('api error handle', errors);

  yield put(failAction());
}

export function* watchErrors(): SagaIterator {
  yield takeEvery(processRequestError, processRequestErrorSaga);
}

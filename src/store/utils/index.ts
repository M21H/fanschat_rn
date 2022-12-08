// @ts-noCheck
import { createAction } from '@reduxjs/toolkit';

import { RootState } from '../types';

enum ASYNC_TYPES {
  REQUEST = 'REQUEST',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  RESET = 'RESET',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const createAsyncAction = <R = void, S = void, E = void>(type: {
  [K in ASYNC_TYPES]: string;
}) => ({
  request: createAction<R>(type.REQUEST),
  pending: createAction(type.PENDING),
  success: createAction<S>(type.SUCCESS),
  failure: createAction<E>(type.FAILURE),
  reset: createAction(type.RESET),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
export const createAsyncType = (TYPE: string) => ({
  REQUEST: `${TYPE}_${ASYNC_TYPES.REQUEST}`,
  PENDING: `${TYPE}_${ASYNC_TYPES.PENDING}`,
  SUCCESS: `${TYPE}_${ASYNC_TYPES.SUCCESS}`,
  FAILURE: `${TYPE}_${ASYNC_TYPES.FAILURE}`,
  RESET: `${TYPE}_${ASYNC_TYPES.RESET}`,
  TYPE,
});

export const createSelectorByActionName =
  (reducerName: keyof RootState) =>
  (actionNames: string[] | string) =>
  (state: RootState): RootState => {
    const getByActionName = (actionName: string): RootState[reducerName] => {
      return state[reducerName][actionName];
    };
    return Array.isArray(actionNames)
      ? actionNames.some(getByActionName)
      : getByActionName(actionNames);
  };

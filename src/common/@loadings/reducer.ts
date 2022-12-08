import { PayloadAction } from '@reduxjs/toolkit';

type State = Record<string, boolean>;

export const loadingsReducer = (state = {} as State, action: PayloadAction): State => {
  const { type } = action;

  if (!state) {
    return {};
  }

  const matches = /(.*)_(PENDING|SUCCESS|FAILURE|RESET)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  const newState = {
    ...state,
    [requestName]: requestState === 'PENDING',
  };

  if (requestState === 'RESET') {
    delete newState[requestName];
  }

  return newState;
};

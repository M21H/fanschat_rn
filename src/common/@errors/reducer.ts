import { PayloadAction } from '@reduxjs/toolkit';

type State = Record<string, boolean>;

export const errorsReducer = (state = {} as State, action: PayloadAction): State => {
  const { type } = action;
  const matches = /(.*)_(PENDING|FAILURE|RESET|SUCCESS)/.exec(type);

  if (!state) {
    return {};
  }

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  const newState = {
    ...state,
    [requestName]: requestState === 'FAILURE',
  };

  if (requestState === 'RESET') {
    delete newState[requestName];
  }

  return newState;
};

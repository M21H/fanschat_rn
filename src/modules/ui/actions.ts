import { createAction } from '@reduxjs/toolkit';

import { State } from './reducer';

export const TYPES = {
  toggleModal: 'ui/TOGGLE_MODAL',
};

export type ModalNames = keyof State;

export const toggleModal = createAction<{ name: ModalNames }>(TYPES.toggleModal);

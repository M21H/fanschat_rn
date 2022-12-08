import { useCallback } from 'react';

import { toggleModal } from '~/modules/ui/actions';
import { store } from '~/store';

export const useIsAuthorizedModal = (): ((callback: () => void) => void) => {
  const isRegistrationCompleted = store.getState().auth.wasRegistrationCompleted;

  const onAuthorized = useCallback(
    (callback: () => void): void => {
      if (isRegistrationCompleted) {
        callback();
      } else {
        store.dispatch(toggleModal({ name: 'authModal' }));
      }
    },
    [isRegistrationCompleted],
  );
  return onAuthorized;
};

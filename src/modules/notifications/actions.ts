import { GetAllNotificationsReq } from '~/services/api/Notifications';
import { createAsyncAction, createAsyncType } from '~/store/utils';

import { INotification } from './types';

export const TYPES = {
  getAllNotifications: createAsyncType('app/GET_ALL_NOTIFICATIONS'),
};

export const getAllNotifications = createAsyncAction<
  GetAllNotificationsReq,
  { data: INotification[]; count: number },
  void
>(TYPES.getAllNotifications);

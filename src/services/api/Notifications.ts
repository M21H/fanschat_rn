import { AxiosPromise } from 'axios';

import { INotification } from '../../modules/notifications/types';
import { Api } from './Api';

export type GetAllNotificationsReq = { page: number };

export class Notifications {
  static getAll({
    page = 1,
  }: GetAllNotificationsReq): AxiosPromise<{ data: INotification[]; count: number }> {
    return Api.get(`notifications?page=${page}&perPage=18`);
  }
}

import { AxiosPromise } from 'axios';

import { ITicker } from '~/modules/feed/types';

import { Api } from './Api';

type GetFeedRes = ITicker;

export class Feed {
  static getFeedMeta(clubId: string): AxiosPromise<GetFeedRes> {
    return Api.get(`/feed/meta/${clubId}`);
  }
}

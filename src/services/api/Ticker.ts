import { AxiosPromise } from 'axios';

import { ITicker } from '~/modules/feed/types';

import { Api } from './Api';

export type GetTickerRes = ITicker;

export class Ticker {
  static getTicker(): AxiosPromise<GetTickerRes> {
    return Api.get('ticker');
  }
}

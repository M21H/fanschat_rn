import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { processRequestError } from '~/common/@errors/actions';
import { Feed } from '~/services/api/Feed';
import { Ticker } from '~/services/api/Ticker';
import { isAxiosError } from '~/utils/apiErrors';

import { getFeed } from '../actions';

export function* getFeedSaga(): SagaIterator {
  try {
    yield put(getFeed.pending());
    const { data } = yield call(Ticker.getTicker);
    const feed = yield call(Feed.getFeedMeta, data.clubId);
    yield put(getFeed.success({ ticker: feed.data.ticker, feedSetup: feed.data.feedSetup }));
  } catch (e) {
    const error = isAxiosError(e);
    if (error) {
      yield put(processRequestError({ error, failAction: getFeed.failure }));
    }
  }
}

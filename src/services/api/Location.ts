import { AxiosPromise } from 'axios';

import { Api } from './Api';

export type GetLocationRes = {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: string;
  lon: string;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
};

export class Location {
  static getLocation(): AxiosPromise<GetLocationRes> {
    return Api.get('location');
  }
}

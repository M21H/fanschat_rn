import { AxiosPromise } from 'axios';

import { Api } from './Api';

export class PrivacyPolicy {
  static getPrivacyPolicyHTML(): AxiosPromise<string> {
    return Api.get('privacy-policy');
  }
}

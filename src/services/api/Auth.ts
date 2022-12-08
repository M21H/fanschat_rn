import { AxiosPromise } from 'axios';

import {
  LoginReq,
  LoginRes,
  RefreshTokenReq,
  RegisterReq,
  RegisterRes,
} from '~/modules/authentication/types';

import { Api } from './Api';

export class Auth {
  static logout(): AxiosPromise<{ success: string }> {
    return Api.post('/auth/logout');
  }

  // static firebaseToken(data: FirebaseTokenReq): AxiosPromise<any> {
  //   return Api.post('/auth/firebase-token', data);
  // }

  static login(data: LoginReq): AxiosPromise<LoginRes> {
    return Api.post<LoginRes>('/auth/login', data);
  }

  static register(data: RegisterReq): AxiosPromise<RegisterRes> {
    return Api.post('/auth/register', data);
  }

  // static updateProfile(data: UpdateProfileReq): AxiosPromise<any> {
  //   return Api.put('/auth/profile', data);
  // }

  // static getProfile(): AxiosPromise<any> {
  //   return Api.get('/auth/profile');
  // }

  // static changePassword(data: ChangePasswordReq): AxiosPromise<any> {
  //   return Api.put('/auth/password-change', data);
  // }

  static refreshToken(data: RefreshTokenReq): AxiosPromise<any> {
    return Api.post('/auth/token-refresh', data);
  }

  // static authFacebook(data: AuthFacebookReq): AxiosPromise<any> {
  //   return Api.post('/auth/facebook', data);
  // }

  // static passwordReset(data: PasswordResetReq): AxiosPromise<any> {
  //   return Api.post('/auth/password-reset/', data);
  // }

  // static passwordResetByToken(token: string): AxiosPromise<any> {
  //   return Api.post(`/auth/password-reset/${token}`);
  // }
}

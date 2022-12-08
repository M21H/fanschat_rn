import { AuthenticatedUser } from '~/models';

type FirebaseTokenReq = {
  fireBaseToken: string;
};
type LoginReq = {
  password: string;
  email: string;
  fireBaseToken?: string;
};

type RegisterReq = {
  password: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phone: string;
  clubId: string;
  fireBaseToken?: string;
};

type UpdateProfileReq = {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  phone: string;
};

type ChangePasswordReq = {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

type RefreshTokenReq = {
  refreshToken: string;
  fireBaseToken: string;
};

type AuthFacebookReq = {
  email: string;
  token: string;
};

type PasswordResetReq = {
  email: string;
};

type PasswordResetByTokenReq = {
  token: string;
};

export {
  AuthFacebookReq,
  ChangePasswordReq,
  FirebaseTokenReq,
  LoginReq,
  PasswordResetByTokenReq,
  PasswordResetReq,
  RefreshTokenReq,
  RegisterReq,
  UpdateProfileReq,
};

// type BaseErrorType = { message: string; param: string }[];
type BaseErrorType = string | Record<string, string[] | Record<string, string[]>>;

type ErrorResponse = {
  status: 'error';
  code: number;
  data: null;
  errors: BaseErrorType;
};

type LoginRes = {
  refreshToken: string;
  token: string;
  user: AuthenticatedUser;
};

type RegisterRes = {
  token: string;
  refreshToken: string;
  user: AuthenticatedUser;
};

export { ErrorResponse, LoginRes, RegisterRes };

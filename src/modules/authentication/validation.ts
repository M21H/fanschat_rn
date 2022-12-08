const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line no-useless-escape
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const login = {
  email: {
    required: 'You must enter your email',
    pattern: { value: EMAIL_REGEX, message: 'email must be a valid email' },
  },
  password: {
    required: 'You must enter your password',
    minLength: {
      value: 6,
      message: 'Please enter a valid password, it should be minimum 6 characters long!',
    },
  },
};

const register = {
  firstName: {
    required: 'You must enter your first name',
  },
  lastName: {
    required: 'You must enter your last name',
  },
  displayName: {
    required: 'You must enter your display name',
  },
  phone: {
    pattern: { value: PHONE_REGEX, message: 'You must enter a valid phone' },
  },
  email: {
    required: 'You must enter your email',
    pattern: { value: EMAIL_REGEX, message: 'email must be a valid email' },
  },
  password: {
    required: 'You must enter your password',
    minLength: {
      value: 6,
      message: 'Please enter a valid password, it should be minimum 6 characters long!',
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default { login, register };

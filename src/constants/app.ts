import { Dimensions } from 'react-native';

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get('screen');

export const SIZES = {
  padding: 16,
  radius: 5,
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH,
};

export const AppColors = {
  primary: '#00638D',
  primary80: '#00638D80',
  primaryDark: '#0A4D68',
  primaryLight: '#004E6C',
  mediumPrimaryDark: '#005282',
  yellow: '#FFCC00',
  lightYellow: '#FFFF00',
  green: '#04B46B',
  greenDark: '#029357',
  white: '#FFFFFF',
  black: '#000000',
  black80: '#00000080',
  red: '#FF0000',
  grey: '#808080',
  grey80: '#80808080',
  grey100: '#DEDEDE',
  lightGray: '#F2F2F2',
  modalGray: '#404040',
  mediumGray: '#c5cbcb',
};

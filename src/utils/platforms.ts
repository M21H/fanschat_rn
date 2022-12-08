/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dimensions, Platform, StatusBar } from 'react-native';

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let iosStatusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneXV = false;
let isIPhoneXMaxV = false;
let isIPhone12V = false;
let isIPhone12MaxV = false;
let isIPhoneWithMonobrowV = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrowV = true;
    isIPhoneXV = true;
    iosStatusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrowV = true;
    isIPhoneXMaxV = true;
    iosStatusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    isIPhoneWithMonobrowV = true;
    isIPhone12V = true;
    iosStatusBarHeight = STATUSBAR_IP12_HEIGHT;
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    isIPhoneWithMonobrowV = true;
    isIPhone12MaxV = true;
    iosStatusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
  }
}

export const isIPhoneX = () => isIPhoneXV;
export const isIPhoneXMax = () => isIPhoneXMaxV;
export const isIPhone12 = () => isIPhone12V;
export const isIPhone12Max = () => isIPhone12MaxV;
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrowV;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export function getStatusBarHeight() {
  return Platform.select({
    ios: iosStatusBarHeight,
    android: StatusBar.currentHeight,
    default: 0,
  });
}

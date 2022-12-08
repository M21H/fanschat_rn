import { PixelRatio } from 'react-native';

import { SIZES } from '~/constants/app';

export const roundPixel = (size: number): number => PixelRatio.roundToNearestPixel(size);

const guideline = {
  width: 375,
  height: 812,
};

const scaleByWidth = (size: number): number => roundPixel((size / guideline.width) * SIZES.width);
const scaleByHeight = (size: number): number =>
  roundPixel((size / guideline.height) * SIZES.height);

export { scaleByHeight as sh, scaleByWidth as sw };

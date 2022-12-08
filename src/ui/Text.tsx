import React from 'react';
import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';

import { AppColors } from '~/constants/app';
import { sw } from '~/utils/scaler';

enum Fonts {
  REGULAR = 'TitilliumWeb-Regular',
  LIGHT = 'TitilliumWeb-Light',
  SEMIBOLD = 'TitilliumWeb-SemiBold',
  BOLD = 'TitilliumWeb-Bold',
}

export interface RNTextProps extends TextProps {
  font?: keyof typeof Fonts;
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: string;
  line?: number;
}

export const Text: React.FC<RNTextProps> = ({ size, font, color, style, line, ...restProps }) => {
  const fontFamily = font ? Fonts[font] : Fonts.REGULAR;
  const fontSize = typeof size === 'number' ? sw(size) : undefined;
  const lineHeight = typeof line === 'number' ? sw(line) : undefined;

  return (
    <RNText
      accessibilityRole="text"
      allowFontScaling={false}
      {...restProps}
      style={[{ color: color || AppColors.black, fontFamily, fontSize, lineHeight }, style]}
    />
  );
};

import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  imgSrc: ImageSourcePropType;
  onPress?: () => void;
  style?: ViewStyle;
};

export const PressableImage: React.VFC<Props> = ({ imgSrc, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={imgSrc} resizeMode="contain" style={{ flex: 1 }} />
    </TouchableOpacity>
  );
};

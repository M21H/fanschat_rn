import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
};

export const PressableIcon: React.FC<Props> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

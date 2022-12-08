import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  containerStyle: ViewStyle;
  onPress: () => void;
  icon: React.ReactNode;
};

export const IconButton: React.VFC<Props> = ({ containerStyle, onPress, icon }) => {
  return (
    <TouchableOpacity style={[styles.root, containerStyle]} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

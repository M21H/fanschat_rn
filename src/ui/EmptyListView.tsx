import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { AppColors } from '~/constants/app';

import { Text } from './Text';

type Props = {
  text: string;
  containerStyle?: ViewStyle;
};

export const EmptyListView: React.VFC<Props> = ({ text, containerStyle }) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <Text size={16}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
});

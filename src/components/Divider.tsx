import React from 'react';
import { StyleProp, StyleSheet, View, ViewProps } from 'react-native';

import { AppColors } from '~/constants/app';

type Props = {
  style?: StyleProp<ViewProps> | ToFix;
};

export const Divider: React.VFC<Props> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: AppColors.grey80,
    height: 1,
    opacity: 0.5,
  },
});

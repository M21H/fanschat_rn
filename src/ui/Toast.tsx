import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';

import { AppColors } from '~/constants/app';
import { Text } from '~/ui';
import { sh } from '~/utils/scaler';

interface Props extends ToastConfigParams<any> {
  icon: React.ReactNode;
}

export const Toast: React.VFC<Props> = ({ text1, icon }) => {
  return (
    <Pressable style={styles.root} pointerEvents="none">
      {icon}
      <Text size={14} font="SEMIBOLD">
        {text1}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    height: sh(50),
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});

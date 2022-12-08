import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AppColors } from '~/constants/app';
import { Text } from '~/ui';
import { isIOS } from '~/utils/platforms';
import { sh } from '~/utils/scaler';

export const toastConfig = {
  success: ({ text1 }: ToastConfigParams<any>): React.ReactNode => (
    <Pressable style={styles.root} pointerEvents="none">
      <Ionicons name="ios-checkmark-circle" size={25} color={AppColors.green} style={styles.icon} />
      <Text size={14} font="SEMIBOLD">
        {text1}
      </Text>
    </Pressable>
  ),
  error: ({ text1 }: ToastConfigParams<any>): React.ReactNode => (
    <View style={styles.root} pointerEvents="none">
      <MaterialIcons name="error" size={25} color="red" style={styles.icon} />
      <Text size={14} font="SEMIBOLD">
        {text1}
      </Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  root: {
    marginTop: isIOS ? 0 : -20,
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

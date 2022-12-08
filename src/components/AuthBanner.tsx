import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppColors } from '~/constants/app';
import { SCREENS } from '~/types/screens';
import { Text } from '~/ui';
import { sh } from '~/utils/scaler';

export const AuthBanner: React.VFC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.loginBanner}>
      <Text size={14} style={{ textAlign: 'center' }}>
        Join us now to access VIP events and exclusive access too...
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnYellow]}
          // @ts-ignore
          onPress={() => navigation.navigate(SCREENS.REGISTRATION)}
        >
          <Text size={14} font="BOLD" style={{ color: AppColors.black }}>
            Join Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnBlack]}
          // @ts-ignore
          onPress={() => navigation.navigate(SCREENS.LOGIN)}
        >
          <Text size={14} font="BOLD" style={{ color: AppColors.white }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  iconNewPost: {
    margin: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: AppColors.black,
  },
  loginBanner: {
    backgroundColor: AppColors.white,
    height: sh(100),
    justifyContent: 'space-between',
    padding: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: sh(40),
    minWidth: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  btnYellow: {
    backgroundColor: AppColors.yellow,
  },
  btnBlack: {
    backgroundColor: AppColors.black,
  },
});

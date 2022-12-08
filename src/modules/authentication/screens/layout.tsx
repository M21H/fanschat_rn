import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { AppColors, SIZES } from '~/constants/app';
import { NavigationIcon, Text } from '~/ui';

type Props = {
  title: string;
  children: () => React.ReactNode | ToFix;
};

export const AuthLayout: React.VFC<Props> = ({ title, children }) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationIcon />

      <View style={styles.root}>
        <View style={styles.container}>
          <Text size={24} font="BOLD" color={AppColors.primary} style={styles.title}>
            {title}
          </Text>
          {children()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primaryLight,
  },
  container: {
    width: '85%',
    backgroundColor: AppColors.white,
    padding: 30,

    borderRadius: SIZES.radius,
  },
  title: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});

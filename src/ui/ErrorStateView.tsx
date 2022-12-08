import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AppColors } from '~/constants/app';

import { Text } from './Text';

type Props = {
  onTryAgain?: () => void;
  containerStyle?: ViewStyle;
};

export const ErrorStateView: React.VFC<Props> = ({ onTryAgain, containerStyle }) => (
  <View style={[styles.root, containerStyle]}>
    <MaterialIcons name="error" size={30} color="red" />
    <TouchableOpacity onPress={onTryAgain}>
      <Text size={16} font="SEMIBOLD" color={AppColors.white}>
        Try again
      </Text>
      <View style={{ height: 1, backgroundColor: AppColors.white }} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

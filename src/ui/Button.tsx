import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { AppColors } from '~/constants/app';
import { RNTextProps, Text } from '~/ui';

interface Props2 extends RNTextProps {
  text: string;
  disabled?: boolean;
  outline?: boolean;
  error?: boolean;
  isLoading?: boolean;
  withIconLeft?: React.ReactNode;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const Button: React.VFC<Props2> = ({
  withIconLeft,
  text,
  disabled = false,
  onPress,
  outline,
  error,
  isLoading = false,
  containerStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        outline && styles.outline,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          {withIconLeft}
          <Text
            font="BOLD"
            size={15}
            style={[
              styles.text,
              { color: outline ? AppColors.primary : AppColors.white },
              error && { color: 'red' },
            ]}
            {...props}
          >
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: AppColors.primary,
  },
  outline: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.primary,
    color: AppColors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
});

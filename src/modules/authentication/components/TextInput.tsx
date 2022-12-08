import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput as RNTextInput, TextInputProps, View } from 'react-native';

import { AppColors } from '~/constants/app';
import { sh } from '~/utils/scaler';

interface Props extends TextInputProps {
  name: string;
  rules?: Record<string, any>;
  control: Control;
  leftIcon?: React.ReactNode;
}

export const TextInput: React.VFC<Props> = ({ control, name, rules = {}, leftIcon, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: AppColors.grey }]}>
            <View style={styles.icon}>{leftIcon}</View>
            <RNTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={AppColors.grey}
              style={styles.input}
              {...props}
            />
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: sh(40),
    flexDirection: 'row',
    alignItems: 'center',

    borderColor: AppColors.black,
    borderBottomWidth: 1,

    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    color: AppColors.black,
    fontSize: 16,

    flex: 1,
  },
});

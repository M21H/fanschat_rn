import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { AppColors } from '~/constants/app';
import { sh } from '~/utils/scaler';

type Props = {
  name: string;
  rules?: Record<string, any>;
  placeholder: string;
  control: Control<any>;
  leftIcon: React.ReactNode;
};
export const PasswordInput: React.VFC<Props> = ({
  control,
  name,
  leftIcon,
  rules = {},
  placeholder,
}) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: AppColors.grey }]}>
            <View style={styles.icon}>{leftIcon}</View>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={AppColors.grey}
              style={styles.input}
              secureTextEntry={isSecure}
            />
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
              {isSecure ? (
                <Entypo name="eye" size={25} color={AppColors.grey} />
              ) : (
                <Entypo name="eye-with-line" size={25} color={AppColors.grey} />
              )}
            </TouchableOpacity>
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
    justifyContent: 'space-between',

    borderBottomWidth: 1,

    marginVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: AppColors.black,
  },
  passwordIcon: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
});

import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { Divider } from '~/components';
import { AppColors, SIZES } from '~/constants/app';
import { sh } from '~/utils/scaler';

interface Props extends Omit<TextInputProps, 'style' | 'value'> {
  value: string;
  setValue: (value: string) => void;
  style?: ViewStyle;
  onPress?: () => void;
}

export const SearchInput: React.VFC<Props> = ({ value, style, setValue, onPress, ...rest }) => {
  return (
    <>
      <View style={[styles.root, style]}>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          value={value}
          placeholderTextColor={AppColors.grey}
          autoCapitalize="none"
          {...rest}
        />

        <TouchableOpacity onPress={onPress}>
          <Feather name="search" size={25} color={AppColors.primary} />
        </TouchableOpacity>
      </View>
      <Divider
        style={{
          height: 1,
          marginHorizontal: SIZES.padding,
          backgroundColor: AppColors.primary,
          opacity: 1,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    height: sh(50),
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

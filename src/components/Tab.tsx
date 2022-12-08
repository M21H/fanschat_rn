import React from 'react';
import { PressableProps, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';

import { AppColors } from '~/constants/app';
import { Text } from '~/ui';

interface Props extends PressableProps {
  title: string;
  isActive: boolean;
  containerStyle?: ViewProps | ToFix;
}

export const Tab: React.VFC<Props> = ({ title, isActive, containerStyle, ...props }) => {
  return (
    <TouchableOpacity
      disabled={isActive}
      key={title}
      // @ts-ignore
      style={[styles.tab, isActive && { backgroundColor: AppColors.primary }, containerStyle]}
      {...props}
    >
      <Text size={16} font="SEMIBOLD" style={isActive && { color: AppColors.white }}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

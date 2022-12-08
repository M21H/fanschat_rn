import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors } from '~/constants/app';

type Props = {
  navigate?: () => void;
};

export const NavigationIcon: React.VFC<Props> = ({ navigate }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigate || navigation.goBack} style={styles.icon}>
      <Ionicons name="ios-chevron-back-circle-sharp" size={35} color={AppColors.black80} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 10,
  },
});

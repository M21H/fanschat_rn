import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors } from '~/constants/app';

export const IconNavigation: React.VFC = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{ position: 'absolute' }} onPress={navigation.goBack}>
      <Ionicons name="ios-chevron-back-circle-sharp" size={30} color={AppColors.black80} />
    </TouchableOpacity>
  );
};

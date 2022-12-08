import React from 'react';
import { useForm } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors } from '~/constants/app';

import { TextInput } from '../components';
import validation from '../validation';
import { AuthLayout } from './layout';

type FormValue = {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  birthDate?: string;
};

export const EditAuthProfileScreen: React.VFC = () => {
  const { control } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: { email: 'scp@scp.com', password: 'qwerty' },
  });
  return (
    <AuthLayout title="Edit Profile">
      {() => {
        <>
          <TextInput
            leftIcon={
              <Ionicons name="ios-shield-checkmark-outline" size={20} color={AppColors.primary} />
            }
            name="firstName"
            placeholder="First Name *"
            autoCorrect={false}
            autoCapitalize="none"
            // @ts-ignore
            control={control}
            rules={validation.register.firstName}
          />
          <TextInput
            leftIcon={
              <Ionicons name="ios-shield-checkmark-outline" size={20} color={AppColors.primary} />
            }
            name="lastName"
            placeholder="Last Name *"
            autoCorrect={false}
            autoCapitalize="none"
            // @ts-ignore
            control={control}
            rules={validation.register.lastName}
          />
          <TextInput
            leftIcon={<AntDesign name="user" size={20} color={AppColors.primary} />}
            name="displayName"
            placeholder="Enter Nickname *"
            autoCorrect={false}
            autoCapitalize="none"
            // @ts-ignore
            control={control}
            rules={validation.register.displayName}
          />
        </>;
      }}
    </AuthLayout>
  );
};

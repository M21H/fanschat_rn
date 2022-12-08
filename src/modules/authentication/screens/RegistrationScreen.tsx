import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import { Divider } from '~/components';
import { AppColors } from '~/constants/app';
import { useTranslation } from '~/i18n';
import { register } from '~/modules/authentication/actions';
import { selectIsRegisterLoading } from '~/modules/authentication/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS } from '~/types/screens';
import { Button, Text } from '~/ui';

import { DateInput, PasswordInput, TextInput } from '../components';
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

// @ts-ignore
export const RegistrationScreen: React.VFC = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isLoading = useAppSelector(selectIsRegisterLoading);
  const clubId = useAppSelector(state => state.feed.ticker?.clubId);
  const [date, setDate] = useState<Date | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: {
      firstName: 'test1',
      lastName: 'test1',
      displayName: 'test1',
      birthDate: '01-01-1900',
      phoneNumber: '1234567890',
      email: 'hicivak453@geekjun.com',
      password: 'qwerty',
    },
  });

  const handleSignUp = (data: FormValue): void => {
    dispatch(
      register.request({
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
        phone: data.phoneNumber,
        email: data.email,
        password: data.password,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        clubId: clubId!,
      }),
    );
  };

  return (
    <AuthLayout title={t('auth:register:title')}>
      {() => (
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
          <TextInput
            leftIcon={<Feather name="phone" size={20} color={AppColors.primary} />}
            name="phoneNumber"
            placeholder="Enter Phone* "
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="phone-pad"
            // @ts-ignore
            control={control}
            rules={validation.register.phone}
          />
          <DateInput
            leftIcon={<MaterialIcons name="calendar-today" size={20} color={AppColors.primary} />}
            onDateChange={setDate}
            // @ts-ignore
            date={date}
            setDate={setDate}
          />
          <TextInput
            leftIcon={<Octicons name="mail" size={20} color={AppColors.primary} />}
            name="email"
            placeholder="Enter Email *"
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            // @ts-ignore
            control={control}
            rules={validation.register.email}
          />

          <PasswordInput
            leftIcon={<Fontisto name="locked" size={20} color={AppColors.primary} />}
            name="password"
            placeholder="Enter Password *"
            autoCorrect={false}
            autoCapitalize="none"
            // @ts-ignore
            control={control}
            rules={validation.register.password}
          />

          <Button
            text={t('auth:register:signupBtn')}
            onPress={handleSubmit(handleSignUp)}
            disabled={!isValid || Boolean(isLoading)}
            isLoading={Boolean(isLoading)}
            containerStyle={{ marginTop: 20 }}
          />

          <TouchableOpacity
            style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}
            onPress={() => navigation.navigate(SCREENS.LOGIN)}
          >
            <Text size={14}>{t('auth:register:signupBtnSubtext')}</Text>
            <Text size={14} font="BOLD" color={AppColors.primary}>
              {t('auth:register:signupBtnLink')}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text size={16} style={{ paddingHorizontal: 5, color: AppColors.grey }}>
              {t('auth:dividerText')}
            </Text>
            <Divider style={styles.divider} />
          </View>

          <Button
            text={t('auth:register:facebookBtn')}
            withIconLeft={<EvilIcons name="sc-facebook" size={30} color={AppColors.primary} />}
            outline
          />

          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.PRIVACY_POLICY)}
            style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}
          >
            <Text size={12}>{t('auth:register:privacyPolicySubtext')}</Text>
            <Text size={12} font="BOLD" color={AppColors.primary}>
              {t('auth:register:privacyPolicyLink')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: AppColors.grey,
  },
});

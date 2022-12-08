import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';

import { Divider } from '~/components';
import { AppColors } from '~/constants/app';
import { useTranslation } from '~/i18n';
import { logIn } from '~/modules/authentication/actions';
import { selectIsLoginLoading } from '~/modules/authentication/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS } from '~/types/screens';
import { Button, Text } from '~/ui';

import { PasswordInput, TextInput } from '../components';
import validation from '../validation';
import { AuthLayout } from './layout';

type FormValue = {
  email: string;
  password: string;
};

// @ts-ignore
export const LoginScreen: React.VFC = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoginLoading);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValue>({
    mode: 'onChange',
    defaultValues: { email: 'scp@scp.com', password: 'qwerty' },
  });

  const { t } = useTranslation();

  const handleLogIn = (data: FormValue): void => {
    dispatch(logIn.request({ email: data.email, password: data.password }));
  };

  return (
    <AuthLayout title={t('auth:login:title')}>
      {() => (
        <>
          <TextInput
            leftIcon={<Octicons name="mail" size={20} color={AppColors.primary} />}
            name="email"
            placeholder="Enter Email*"
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            // @ts-ignore
            control={control}
            rules={validation.login.email}
          />
          <PasswordInput
            leftIcon={<Fontisto name="locked" size={20} color={AppColors.primary} />}
            name="password"
            placeholder="Enter Password*"
            autoCorrect={false}
            // @ts-ignore
            control={control}
            autoCapitalize="none"
            rules={validation.login.password}
          />

          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.RESET_PASSWORD)}>
            <Text size={14} font="BOLD" color={AppColors.primary} style={styles.forgotPassword}>
              {t('auth:login:forgotPassword')}
            </Text>
          </TouchableOpacity>

          <Button
            text={t('auth:login:loginBtn')}
            isLoading={Boolean(isLoading)}
            disabled={!isValid || Boolean(isLoading)}
            onPress={handleSubmit(handleLogIn)}
          />

          <TouchableOpacity
            style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 15 }}
            onPress={() => navigation.navigate(SCREENS.REGISTRATION)}
          >
            <Text size={14}>{t('auth:login:loginBtnSubtext')}</Text>
            <Text size={14} font="BOLD" color={AppColors.primary}>
              {t('auth:login:loginBtnLink')}
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
            text={t('auth:login:facebookBtn')}
            withIconLeft={<EvilIcons name="sc-facebook" size={30} color={AppColors.primary} />}
            outline
          />
        </>
      )}
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
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

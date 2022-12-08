import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import { AppColors } from '~/constants/app';
import { useTranslation } from '~/i18n';
import { Button } from '~/ui';
import { Logger } from '~/utils/logger';
import { isIOS } from '~/utils/platforms';

import { TextInput } from '../components';
import { AuthLayout } from './layout';

type FormValue = {
  email: string;
};

export const ResetPasswordScreen: React.VFC = () => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValue>({ mode: 'onChange' });

  const handleResetPassword = (data: FormValue): void => {
    Logger.log('handleResetPassword', data);
  };

  return (
    <AuthLayout title={t('auth:resetPassword:title')}>
      {() => (
        <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'}>
          <TextInput
            leftIcon={<Octicons name="mail" size={20} color={AppColors.primary} />}
            name="email"
            placeholder="Enter Email *"
            autoCorrect={false}
            autoCapitalize="none"
            // @ts-ignore
            control={control}
          />

          <Button
            text={t('auth:resetPassword:resetPasswordBtn')}
            disabled={!isValid}
            onPress={handleSubmit(handleResetPassword)}
            containerStyle={{ marginTop: 10 }}
          />
        </KeyboardAvoidingView>
      )}
    </AuthLayout>
  );
};

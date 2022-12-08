import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '~/constants/app';
import { toggleModal } from '~/modules/ui/actions';
import { selectAuthModal } from '~/modules/ui/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS } from '~/types/screens';
import { Button, Text } from '~/ui';
import { Modal } from '~/ui';

export const AuthModal: React.VFC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectAuthModal);
  return (
    <Modal visible={modal} name="authModal">
      <View style={styles.content}>
        <Text size={20} font="SEMIBOLD" color={AppColors.yellow} style={{ textAlign: 'center' }}>
          You need to join now in order to access all features of the app?
        </Text>
        <View style={styles.actions}>
          <Button
            onPress={() => {
              dispatch(toggleModal({ name: 'authModal' }));
              // @ts-ignore
              navigation.navigate(SCREENS.REGISTRATION);
            }}
            text="Join Now"
            containerStyle={{ width: 120, backgroundColor: AppColors.green, marginRight: 20 }}
          />
          <Button
            onPress={() => {
              dispatch(toggleModal({ name: 'authModal' }));
              // @ts-ignore
              navigation.navigate(SCREENS.LOGIN);
            }}
            text="Sign In"
            containerStyle={{ width: 120 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

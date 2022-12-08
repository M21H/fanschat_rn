import React, { useEffect, useState } from 'react';
import { FlatList, Modal, SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppColors } from '~/constants/app';
import { getAllNotifications } from '~/modules/notifications/actions';
import {
  selectIsNotificationLoading,
  selectNotifications,
} from '~/modules/notifications/selectors';
import { toggleModal } from '~/modules/ui/actions';
import { selectNotificationsModal } from '~/modules/ui/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { LoadingStateView, Text } from '~/ui';

import { NotificationCard } from './NotificationCard';

export const NotificationsModal: React.VFC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectNotificationsModal);
  const notifications = useAppSelector(selectNotifications);
  const isLoading = useAppSelector(selectIsNotificationLoading);
  const [page] = useState(1);

  useEffect(() => {
    dispatch(getAllNotifications.request({ page }));
  }, [dispatch, page]);

  if (isLoading) {
    return <LoadingStateView />;
  }

  return (
    <Modal visible={modal} animationType="slide">
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: AppColors.green }}>
        <View style={{ backgroundColor: AppColors.green, position: 'relative' }}>
          <Text font="BOLD" size={30} color={AppColors.white} style={{ alignSelf: 'center' }}>
            Notifications
          </Text>

          <TouchableOpacity
            style={{
              padding: 16,
              paddingTop: 17,
              position: 'absolute',
              right: 0,
            }}
            onPress={() => dispatch(toggleModal({ name: 'notificationsModal' }))}
          >
            <Fontisto name="close-a" size={15} color={AppColors.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          listKey="NotificationScreen"
          contentContainerStyle={{
            padding: 10,
            backgroundColor: AppColors.white,
          }}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <NotificationCard item={item} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

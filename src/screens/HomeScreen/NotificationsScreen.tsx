import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { NotificationCard } from '~/components';
import { getAllNotifications } from '~/modules/notifications/actions';
import {
  selectIsNotificationLoading,
  selectNotifications,
} from '~/modules/notifications/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { LoadingStateView } from '~/ui';

export const NotificationScreen: React.VFC = () => {
  const dispatch = useAppDispatch();
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
    <FlatList
      data={notifications}
      listKey="Notifications"
      contentContainerStyle={{ padding: 10 }}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <NotificationCard item={item} />}
    />
  );
};

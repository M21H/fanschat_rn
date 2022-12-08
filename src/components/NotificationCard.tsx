import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors } from '~/constants/app';
import { INotification } from '~/modules/notifications/types';
import { Text } from '~/ui';

type Props = {
  item: INotification;
};

export const NotificationCard: React.VFC<Props> = ({ item }) => {
  return (
    <TouchableOpacity style={styles.notification}>
      <View style={styles.icon}>
        <Ionicons name="md-notifications" size={20} color={AppColors.grey} />
      </View>
      <View style={styles.content}>
        <Text size={18} font="BOLD" color={AppColors.green}>
          {item.event}
        </Text>
        <Text size={16} color={AppColors.black} numberOfLines={1}>
          {item.title}
        </Text>
        <Text size={14} color={AppColors.grey} numberOfLines={1} style={{ marginLeft: 'auto' }}>
          {moment(item.updated, 'YYYYMMDD').fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notification: {
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: AppColors.grey80,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.grey80,
  },
  content: {
    flex: 1,
  },
});

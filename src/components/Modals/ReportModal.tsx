import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { AppColors } from '~/constants/app';
import { toggleModal } from '~/modules/ui/actions';
import { selectReportModal } from '~/modules/ui/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Text } from '~/ui';
import { Modal } from '~/ui';

import { IconButton } from '../IconButton';

export const ReportModal: React.VFC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectReportModal);
  return (
    <Modal visible={modal} name="reportModal">
      <View style={styles.title}>
        <Text size={20} font="SEMIBOLD" color={AppColors.yellow}>
          Report User
        </Text>
      </View>

      <View style={styles.content}>
        <Text size={16} font="SEMIBOLD" color={AppColors.yellow} style={{ textAlign: 'center' }}>
          Are you sure you want to report this user?
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Report message"
        placeholderTextColor={AppColors.grey}
      />

      <View style={styles.actions}>
        <IconButton
          onPress={() => dispatch(toggleModal({ name: 'reportModal' }))}
          containerStyle={{
            width: 90,
            marginRight: 10,
            backgroundColor: AppColors.yellow,
          }}
          icon={<Entypo name="cross" color={AppColors.black} size={30} />}
        />
        <IconButton
          onPress={() => {}}
          containerStyle={{
            width: 90,
            backgroundColor: AppColors.primary,
          }}
          icon={<FontAwesome5 name="check" color={AppColors.white} size={20} />}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
  },
  content: {
    padding: 20,
  },
  input: {
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,

    fontSize: 16,
    borderBottomColor: AppColors.yellow,
    borderBottomWidth: 1,
    color: AppColors.white,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  },
});

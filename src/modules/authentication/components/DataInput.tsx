import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { AppColors } from '~/constants/app';
import { Text } from '~/ui';
import { sh } from '~/utils/scaler';

type Props = {
  date: Date;
  setDate: (date: Date) => void;
  leftIcon: React.ReactNode;
};

export const DateInput: React.VFC<Props> = ({ date, setDate, leftIcon }) => {
  const [show, setShow] = useState(false);

  const handleConfirm = (date: Date): void => {
    setDate(date);
    setShow(false);
  };

  const renderDatePicker = (): React.ReactNode => {
    return (
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onCancel={() => setShow(false)}
        onConfirm={handleConfirm}
        // @ts-ignore
        onChange={(date: Date) => setDate(date)}
        maximumDate={new Date()}
        minimumDate={new Date(1950, 0, 1)}
        textColor={AppColors.black}
      />
    );
  };

  return (
    <TouchableOpacity onPress={() => setShow(true)}>
      <View style={styles.input}>
        <View style={styles.icon}>{leftIcon}</View>

        <Text size={16} color={date ? AppColors.black : AppColors.black80}>
          {date ? moment(date).format('DD-MM-YYYY') : 'Select Birth Date *'}
        </Text>
      </View>
      {renderDatePicker()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    height: sh(40),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: AppColors.grey,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
});

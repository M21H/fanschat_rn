import React, { useCallback } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppColors, SIZES } from '~/constants/app';
import { ModalNames, toggleModal } from '~/modules/ui/actions';
import { useAppDispatch } from '~/store/hooks';
import { isIOS } from '~/utils/platforms';

type Props = {
  name: ModalNames;
  visible: boolean;
};

export const Modal: React.FC<Props> = ({ children, visible, name }) => {
  const dispatch = useAppDispatch();

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal({ name }));
  }, [dispatch, name]);

  return (
    <RNModal statusBarTranslucent transparent visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} keyboardVerticalOffset={50}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.icon} onPress={handleToggleModal}>
                <Fontisto name="close-a" size={20} color={AppColors.grey} />
              </TouchableOpacity>
              {children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 'auto',
    padding: 10,
  },
  container: {
    position: 'relative',
    borderTopColor: AppColors.yellow,
    borderTopWidth: 2,
    width: SIZES.width - SIZES.padding * 2,
    backgroundColor: AppColors.modalGray,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 20,
    zIndex: 100,
  },
});

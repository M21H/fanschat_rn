import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors, SIZES } from '~/constants/app';
import { isIOS } from '~/utils/platforms';
import { sh, sw } from '~/utils/scaler';

interface Props extends TextInputProps {
  onSendMessage: () => void;
  isDisabled: boolean;
}

export const CommentsInput: React.VFC<Props> = ({ onSendMessage, isDisabled, ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} behavior={isIOS ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.inputContainer,
            { marginBottom: insets.bottom === 0 ? sh(10) : insets.bottom },
          ]}
        >
          <TextInput style={styles.input} {...props} />
          <TouchableOpacity
            style={[
              styles.btnSend,
              { backgroundColor: isDisabled ? AppColors.primary80 : AppColors.primary },
            ]}
            onPress={onSendMessage}
            disabled={isDisabled}
          >
            <Ionicons name="md-send-sharp" size={20} color={AppColors.white} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: sh(40),
    borderWidth: 1,
    borderRadius: 100,
    borderColor: AppColors.primary80,
    marginHorizontal: SIZES.padding,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  btnSend: {
    width: sw(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

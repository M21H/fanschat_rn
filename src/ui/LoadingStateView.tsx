import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  activityIndicator?: ActivityIndicatorProps;
  containerStyle?: ViewStyle;
};

export const LoadingStateView: React.VFC<Props> = ({ containerStyle, activityIndicator }) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <ActivityIndicator size="large" style={activityIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

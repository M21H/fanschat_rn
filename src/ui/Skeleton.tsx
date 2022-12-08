import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, View, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  width: number;
  height?: number;
  style?: StyleProp<ViewProps> | ToFix;
};

export const Skeleton: React.VFC<Props> = ({ style, height, width }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <View
      style={[{ width, height, backgroundColor: 'rgba(0, 0, 0, 0.12)', overflow: 'hidden' }, style]}
    >
      <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateX }] }}>
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={['transparent', 'rgba(0, 0, 0, 0.07)', 'transparent']}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

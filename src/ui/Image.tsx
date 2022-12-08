import React, { useState } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Reanimated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface Props extends FastImageProps {
  skeleton?: React.ReactNode;
}

export const Image: React.VFC<Props> = ({ onLoad, style, skeleton: Skeleton, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isLoaded ? 1 : 0, { duration: 300 }),
  }));

  return (
    <>
      <AnimatedFastImage
        onLoad={e => {
          onLoad?.(e);
          setIsLoaded(true);
        }}
        style={[style, animatedStyle]}
        resizeMode={FastImage.resizeMode.cover}
        {...props}
      />
      {!isLoaded && Skeleton}
    </>
  );
};

const AnimatedFastImage = Reanimated.createAnimatedComponent(FastImage as React.VFC<Props>);

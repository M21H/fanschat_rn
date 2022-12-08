import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { images } from '~/assets/images';
import { AppColors } from '~/constants/app';
import { Text } from '~/ui';

type Props = {
  src: string | undefined;
  level?: number;
  outline?: boolean;
  name?: string;
  size?: number;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  disable?: boolean;
};

export const Avatar: React.FC<Props> = ({
  outline,
  size = 50,
  src,
  onPress,
  level,
  name,
  containerStyle,
  disable,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : 0.5}
      onPress={onPress}
      style={[{ alignItems: 'center' }, containerStyle]}
    >
      <Image
        style={[
          { width: size, height: size, borderRadius: size / 2 },
          outline && { borderWidth: 2, borderColor: AppColors.green },
        ]}
        resizeMode="cover"
        source={src ? { uri: src } : images.blankProfile}
      />
      {name && (
        <Text font="SEMIBOLD" style={{ textAlign: 'center' }}>
          {name}
        </Text>
      )}

      {typeof level !== 'undefined' ? (
        <ImageBackground source={images.nexLevelMarker} style={styles.markerImage}>
          <Text font="SEMIBOLD" color={AppColors.white} style={styles.nextLevel}>
            {level}
          </Text>
        </ImageBackground>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  markerImage: {
    marginTop: -14,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 22,
    width: 20,
    resizeMode: 'contain',
  },
  nextLevel: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

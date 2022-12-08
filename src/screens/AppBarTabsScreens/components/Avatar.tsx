import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { images } from '~/assets/images';
import { Image, Text } from '~/ui';

type Props = {
  src: string | undefined;
  onPress?: () => void;
  name?: string;
  containerStyle?: ViewStyle;
  selectedIcon?: React.ReactNode;
};

export const Avatar: React.VFC<Props> = ({
  src,
  containerStyle,

  onPress,
  name,
  selectedIcon,
}) => {
  return (
    <TouchableOpacity style={[styles.root, containerStyle]} onPress={onPress}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={src ? { uri: src } : images.blankProfile}
      />
      <Text font="SEMIBOLD" numberOfLines={1}>
        {name}
      </Text>
      {selectedIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  image: {
    position: 'relative',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

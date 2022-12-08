import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

import { images } from '~/assets/images';
import { AppColors, SIZES } from '~/constants/app';
import { NavigationIcon, Text } from '~/ui';

type Props = {
  route: {
    params: {
      feedContentId: string;
      type: string;
    };
  };
};

export const AboutStreaming: React.VFC<Props> = () => {
  return (
    <View style={styles.root}>
      <NavigationIcon />
      <View>
        <View style={styles.video} />
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action}>
            <AntDesign name="like1" size={25} color={AppColors.white} style={{ marginRight: 8 }} />
            <Text color={AppColors.white} size={16} font="SEMIBOLD">
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <Feather name="share-2" size={25} color={AppColors.white} />
            <Text color={AppColors.white} size={16} font="SEMIBOLD">
              1
            </Text>
          </TouchableOpacity>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <TouchableOpacity style={styles.action}>
              <Octicons name="mail" size={25} color={AppColors.white} style={{ marginRight: 8 }} />
              <Text color={AppColors.white} size={16} font="SEMIBOLD">
                1
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                width: 1,
                backgroundColor: AppColors.white,
                marginHorizontal: 10,
              }}
            />
            <Image
              source={images.logoFanschat}
              style={{ height: 30, width: 30 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  video: {
    height: SIZES.height / 4,
    backgroundColor: 'blue',
  },
  actions: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
  },
});

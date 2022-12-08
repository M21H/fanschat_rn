import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ImageStyle } from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppColors, SIZES } from '~/constants/app';
import { IFeedData } from '~/modules/feed/types';
import { Image, Text } from '~/ui';

type Props = {
  item: IFeedData;
  withDetails?: boolean;
  containerStyle: ViewStyle;
  imageContainerStyle: ImageStyle;
  navigate: (id: string) => void;
};

export const VerticalCarouselCard: React.VFC<Props> = ({
  containerStyle,
  imageContainerStyle,
  item,
  navigate,
  withDetails = true,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(item._id)}
      style={{
        width: 270,
        ...containerStyle,
      }}
    >
      <Animated.View
        style={{
          borderRadius: SIZES.radius,
          backgroundColor: AppColors.white,
          alignItems: 'center',
        }}
      >
        <Image style={[styles.image, imageContainerStyle]} source={{ uri: item.imageUrl }} />
      </Animated.View>
      <Text font="SEMIBOLD" color={AppColors.white} numberOfLines={1}>
        {item.title}
      </Text>
      {withDetails && (
        <View style={styles.contentDetails}>
          <View style={styles.contentDetail}>
            <AntDesign name="eye" size={15} color={AppColors.greenDark} />
            <Text color={AppColors.greenDark}>{item.watchCount}</Text>
          </View>
          <View style={styles.contentDetail}>
            <Ionicons name="ios-heart" size={15} color={AppColors.greenDark} />
            <Text color={AppColors.greenDark}>{item.likeCount}</Text>
          </View>
          <View style={styles.contentDetail}>
            <MaterialCommunityIcons name="message" size={15} color={AppColors.greenDark} />
            <Text color={AppColors.greenDark}>{item.commentsCount}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
  },
  contentDetails: {
    flexDirection: 'row',
  },
  contentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

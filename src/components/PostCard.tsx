import moment from 'moment';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import { images } from '~/assets/images';
import { AppColors, SIZES } from '~/constants/app';
import { IFeedData, IPost } from '~/modules/feed/types';
import { Text } from '~/ui';

type Props = {
  item: IPost | IFeedData;
  navigate: (id: string) => void;
  containerStyle: ViewStyle;
};

export const PostCard: React.VFC<Props> = ({ item, navigate, containerStyle }) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={() => navigate(item._id)}>
      <FastImage
        source={{ uri: item.imageUrl }}
        style={{ height: (SIZES.width / 16) * 9 }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.footer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              style={{
                height: 30,
                width: 30,
                marginRight: 8,
                borderRadius: 15,
              }}
              source={item.owner.avatarUrl ? { uri: item.owner.avatarUrl } : images.blankProfile}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text font="BOLD" color={AppColors.white}>
              {item.owner.displayName}
            </Text>
          </View>
          <Text font="SEMIBOLD" color={AppColors.white}>
            {moment(item.created, 'YYYYMMDD').fromNow()}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text font="SEMIBOLD" color={AppColors.white} numberOfLines={1} style={{ flex: 0.7 }}>
            {item.title}
          </Text>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign
                name={item.likedByMe ? 'heart' : 'hearto'}
                size={15}
                color={AppColors.white}
                style={{ marginRight: 5 }}
              />
              <Text color={AppColors.white}>{item.likeCount}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather
                name="message-square"
                size={15}
                color={AppColors.white}
                style={{ marginRight: 5 }}
              />
              <Text color={AppColors.white}>{item.commentsCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: SIZES.padding / 2,
    backgroundColor: AppColors.primary,
  },
});

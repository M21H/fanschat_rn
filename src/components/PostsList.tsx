import React from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';

import { images } from '~/assets/images';
import { AppColors, SIZES } from '~/constants/app';
import { IPost } from '~/modules/feed/types';
import { NavigationIcon, Text } from '~/ui';

import { PostCard } from './PostCard';

type Props = {
  title: string;
  data: IPost[];
  navigate: (id: string) => void;
};

const Header: React.VFC<{ title: string }> = ({ title }) => {
  return (
    <ImageBackground source={images.headerBlank} style={styles.headerImage} resizeMode="cover">
      <Text size={30} color={AppColors.white} font="BOLD">
        {title}
      </Text>
    </ImageBackground>
  );
};

export const PostsList: React.VFC<Props> = ({ title, data, navigate }) => {
  return (
    <View style={styles.root}>
      <NavigationIcon />
      <FlatList
        data={data}
        ListHeaderComponent={<Header title={title} />}
        listKey="PostsList"
        keyExtractor={item => item._id}
        renderItem={({ item, index }) => (
          <PostCard
            containerStyle={{ marginBottom: data.length - 1 === index ? 0 : SIZES.padding }}
            navigate={navigate}
            item={item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.primaryLight,
  },
  headerImage: {
    height: SIZES.height / 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
});

import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { SIZES } from '~/constants/app';
import { IFeedSetup } from '~/modules/feed/types';
import { SCREENS } from '~/types/screens';

import { PostCard } from '../PostCard';

type Props = {
  feedItem: IFeedSetup;
};

export const Feed: React.VFC<Props> = ({ feedItem }) => {
  const navigation = useNavigation();

  const navigateToPost = useCallback(
    (id: string) => {
      // @ts-ignore
      navigation.navigate(SCREENS.ABOUT_POST, {
        postId: id,
      });
    },
    [navigation],
  );
  return (
    <FlatList
      data={feedItem.content}
      listKey="Feed"
      keyExtractor={item => item._id}
      renderItem={({ item, index }) => (
        <PostCard
          containerStyle={{
            marginBottom: feedItem.content.length - 1 === index ? 0 : SIZES.padding,
          }}
          navigate={navigateToPost}
          item={item}
        />
      )}
    />
  );
};

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';

import { images } from '~/assets/images';
import { SIZES } from '~/constants/app';
import { IFeedSetup } from '~/modules/feed/types';
import { SCREENS } from '~/types/screens';
import { Image } from '~/ui';

import { Section } from '../Section';
import { VerticalCarouselCard } from '../VerticalCarouselCard';

type Props = {
  feedItem: IFeedSetup;
};

export const Gallery: React.VFC<Props> = ({ feedItem }) => {
  const navigation = useNavigation();
  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  const navigateToNews = useCallback(
    (id: string) => {
      // @ts-ignore
      navigation.navigate(SCREENS.ABOUT_NEWS, { newsId: id });
    },
    [navigation],
  );

  const handleAddToFilters = (index: number): void => {
    const isExist = activeFilters.some(i => i === index);
    if (isExist) {
      setActiveFilters(filters => filters.filter(i => i !== index));
    } else {
      setActiveFilters(filters => [...filters, index]);
    }
  };

  return (
    <View style={{ paddingHorizontal: SIZES.padding, backgroundColor: feedItem.background }}>
      <Section
        activeFilters={activeFilters}
        item={feedItem}
        // @ts-ignore
        navigate={() => navigation.navigate(SCREENS.NEWS_TAB)}
        addToFilters={handleAddToFilters}
        containerStyles={{
          paddingTop: SIZES.padding,
        }}
      />

      <FlatList
        data={feedItem.content}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: SIZES.padding,
        }}
        ListFooterComponent={
          <Image
            source={images.banner}
            style={{
              width: '100%',
              height: 157,
              marginVertical: SIZES.padding,
              marginBottom: SIZES.padding * 2,
              borderRadius: SIZES.radius,
            }}
          />
        }
        listKey="Gallery"
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <VerticalCarouselCard
            item={item}
            containerStyle={{
              width: (SIZES.width - SIZES.padding * 2) / 2 - SIZES.padding / 2,
              // justifyContent: 'space-between',
            }}
            imageContainerStyle={{ height: 100 }}
            navigate={navigateToNews}
          />
        )}
      />
    </View>
  );
};

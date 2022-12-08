import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { View } from 'react-native';

import { SIZES } from '~/constants/app';
import { IFeedSetup } from '~/modules/feed/types';
import { SCREENS } from '~/types/screens';

import { Section } from '../Section';
import { VerticalCarouselCard } from '../VerticalCarouselCard';

type Props = {
  feedItem: IFeedSetup;
};

const HEIGHT = SIZES.width * 0.7;

export const PortraitCarousel: React.VFC<Props> = ({ feedItem }) => {
  const navigation = useNavigation();
  const [activeFilters, setActiveFilters] = useState<number[]>([]);

  const handleAddToFilters = (index: number): void => {
    const isExist = activeFilters.some(i => i === index);
    if (isExist) {
      setActiveFilters(filters => filters.filter(i => i !== index));
    } else {
      setActiveFilters(filters => [...filters, index]);
    }
  };

  const navigateToVideo = useCallback(
    (id: string) => {
      // @ts-ignore
      navigation.navigate(SCREENS.ABOUT_VIDEO, { videoId: id });
    },
    [navigation],
  );

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ backgroundColor: feedItem.background }}>
      <Section
        containerStyles={{
          paddingTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
        activeFilters={activeFilters}
        item={feedItem}
        // @ts-ignore
        navigate={() => navigation.navigate(SCREENS.VIDEOS, { title: 'Streaming' })}
        addToFilters={handleAddToFilters}
      />

      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        snapToInterval={HEIGHT}
        decelerationRate={0}
        scrollEventThrottle={16}
        data={feedItem.content}
        listKey="PortraitCarousel"
        keyExtractor={item => item._id}
        renderItem={({ item, index }) => {
          return (
            <VerticalCarouselCard
              item={item}
              containerStyle={{
                width: HEIGHT,
                marginBottom: SIZES.padding,
                marginRight: SIZES.padding,
                marginLeft: index === 0 ? SIZES.padding : 0,
              }}
              imageContainerStyle={{
                height: HEIGHT * 1.2,
                borderRadius: SIZES.radius,
              }}
              navigate={navigateToVideo}
              withDetails={false}
            />
          );
        }}
      />
    </View>
  );
};

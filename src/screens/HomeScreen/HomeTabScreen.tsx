import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AuthBanner } from '~/components';
import { Carousel, Feed, Gallery, Pager, PortraitCarousel } from '~/components/Carousels';
import { AppColors } from '~/constants/app';
import { useIsAuthorizedModal } from '~/hooks';
import { selectWasRegistrationCompleted } from '~/modules/authentication/selectors';
import { getFeed } from '~/modules/feed/actions';
import {
  selectFeedSetup,
  selectIsFeedLoading,
  selectIsFeedLoadingError,
} from '~/modules/feed/selectors';
import { FeedSetupType } from '~/modules/feed/types';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { HomeTabScreenNavigationProp, SCREENS } from '~/types/screens';
import { ErrorStateView, LoadingStateView } from '~/ui';

type Props = {
  navigation: HomeTabScreenNavigationProp;
};

export const HomeTabScreen: React.VFC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const onAuthorized = useIsAuthorizedModal();

  const isAuthenticated = useAppSelector(selectWasRegistrationCompleted);
  const feedSetup = useAppSelector(selectFeedSetup);

  const isLoading = useAppSelector(selectIsFeedLoading);
  const isError = useAppSelector(selectIsFeedLoadingError);

  const listRef = useRef<FlatList>(null);

  const fetchData = useCallback(() => {
    dispatch(getFeed.request());
  }, [dispatch]);

  useFocusEffect(fetchData);

  if (isLoading) {
    return <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />;
  }

  return (
    <View style={styles.root}>
      {isError ? (
        <ErrorStateView onTryAgain={fetchData} />
      ) : (
        <>
          <FlatList
            data={feedSetup}
            ref={listRef}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            ListHeaderComponent={!isAuthenticated ? AuthBanner : undefined}
            renderItem={({ item }) => {
              switch (item.type) {
                case FeedSetupType.CAROUSEL:
                  return <Carousel feedItem={item} />;
                case FeedSetupType.GALLERY:
                  return <Gallery feedItem={item} />;
                case FeedSetupType.PAGER:
                  return <Pager feedItem={item} />;
                case FeedSetupType.PORTRAIT_CAROUSEL:
                  return <PortraitCarousel feedItem={item} />;
                case FeedSetupType.FEED:
                  return <Feed feedItem={item} />;
                default:
                  return null;
              }
            }}
          />

          <TouchableOpacity
            onPress={() => {
              onAuthorized(() => navigation.navigate(SCREENS.CREATE_POST));
            }}
            style={styles.icon}
          >
            <AntDesign name="plus" color={AppColors.white} size={25} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.primaryLight,
  },
  icon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: AppColors.black,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

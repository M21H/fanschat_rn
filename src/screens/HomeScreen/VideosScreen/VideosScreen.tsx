import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { PostsList } from '~/components';
import { AppColors } from '~/constants/app';
import { getAllVideos } from '~/modules/feed/actions';
import { selectIsAllVideoLoading, selectPosts } from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS, VideoScreenNavigationProps, VideoScreenStackRouteProps } from '~/types/screens';
import { LoadingStateView } from '~/ui';

type Props = {
  navigation: VideoScreenNavigationProps;
  route: VideoScreenStackRouteProps;
};

export const VideosScreen: React.VFC<Props> = ({ navigation, route }) => {
  const title = route.params?.title ?? 'Videos';
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAllVideoLoading);
  const posts = useAppSelector(selectPosts);

  const fetchData = useCallback(() => {
    dispatch(getAllVideos.request());
  }, [dispatch]);

  useFocusEffect(fetchData);

  const navigateToVideo = useCallback(
    (id: string) => {
      navigation.navigate(SCREENS.ABOUT_VIDEO, { videoId: id });
    },
    [navigation],
  );

  return isLoading ? (
    <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />
  ) : (
    <PostsList title={title} data={posts} navigate={navigateToVideo} />
  );
};

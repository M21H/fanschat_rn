import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { PostsList } from '~/components';
import { AppColors } from '~/constants/app';
import { getAllNews } from '~/modules/feed/actions';
import { selectIsAllNewsLoading, selectPosts } from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { NewsTabScreenNavigationProps, SCREENS } from '~/types/screens';
import { LoadingStateView } from '~/ui';

type Props = {
  navigation: NewsTabScreenNavigationProps;
};

export const NewsTabScreen: React.VFC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAllNewsLoading);
  const posts = useAppSelector(selectPosts);

  const fetchData = useCallback(() => {
    dispatch(getAllNews.request());
  }, [dispatch]);

  useFocusEffect(fetchData);

  const navigateToNews = useCallback(
    (id: string) => {
      navigation.navigate(SCREENS.ABOUT_NEWS, { newsId: id });
    },
    [navigation],
  );

  return isLoading ? (
    <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />
  ) : (
    <PostsList title="NEWS" data={posts} navigate={navigateToNews} />
  );
};

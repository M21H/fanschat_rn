import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { PostsList } from '~/components';
import { AppColors } from '~/constants/app';
import { getAllSocial } from '~/modules/feed/actions';
import { selectIsAllSocialLoading, selectPosts } from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS, SocialTabScreenNavigationProps } from '~/types/screens';
import { LoadingStateView } from '~/ui';

type Props = {
  navigation: SocialTabScreenNavigationProps;
};

export const SocialTabScreen: React.VFC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAllSocialLoading);
  const posts = useAppSelector(selectPosts);

  const fetchData = useCallback(() => {
    dispatch(getAllSocial.request());
  }, [dispatch]);

  useFocusEffect(fetchData);

  const navigateToSocial = useCallback(
    (id: string) => {
      navigation.navigate(SCREENS.ABOUT_SOCIAL, { socialId: id });
    },
    [navigation],
  );

  return isLoading ? (
    <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />
  ) : (
    <PostsList title="SOCIAL" data={posts} navigate={navigateToSocial} />
  );
};

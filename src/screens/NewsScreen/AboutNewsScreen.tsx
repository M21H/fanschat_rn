import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { AboutItem } from '~/components';
import { AppColors } from '~/constants/app';
import { useIsAuthorizedModal } from '~/hooks';
import {
  addNewsComment,
  deleteNewsComment,
  getOneNews,
  updateNewsLikes,
} from '~/modules/feed/actions';
import {
  selectIsNewsCommentDeleting,
  selectIsNewsLikeUpdating,
  selectIsOneNewsLoading,
  selectSelectedItem,
} from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { AboutNewsStackRouteProps } from '~/types/screens';
import { LoadingStateView } from '~/ui';

type Props = {
  route: AboutNewsStackRouteProps;
};

export const AboutNewsScreen: React.VFC<Props> = ({ route }) => {
  const { newsId } = route.params;

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsOneNewsLoading);

  const isNewsLikeUpdating = useAppSelector(selectIsNewsLikeUpdating);
  const isNewsCommentDeleting = useAppSelector(selectIsNewsCommentDeleting);
  const { data } = useAppSelector(selectSelectedItem);
  const onAuthorized = useIsAuthorizedModal();

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getOneNews.request({ id: newsId }));
  }, [dispatch, newsId]);

  const handleUpdateLikes = useCallback(() => {
    dispatch(updateNewsLikes.request({ id: newsId, like: !data?.likedByMe }));
  }, [data?.likedByMe, dispatch, newsId]);

  const handleDeleteComment = useCallback(
    (newsId: string) => {
      dispatch(deleteNewsComment.request({ id: newsId }));
    },
    [dispatch],
  );

  const handleSendMessage = useCallback(() => {
    if (data?._id) {
      dispatch(
        addNewsComment.request({
          comment: commentText,
          postId: data?._id,
        }),
      );
    }

    Keyboard.dismiss();
    setCommentText('');
  }, [commentText, data?._id, dispatch]);

  if (isLoading) {
    return <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />;
  }

  return (
    <AboutItem
      isLikeUpdating={Boolean(isNewsLikeUpdating)}
      isCommentDeleting={Boolean(isNewsCommentDeleting)}
      onDeletePostComment={handleDeleteComment}
      onUpdateLikes={handleUpdateLikes}
      commentText={commentText}
      setCommentText={setCommentText}
      onSendMessage={() => onAuthorized(handleSendMessage)}
    />
  );
};

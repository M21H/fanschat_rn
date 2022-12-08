import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { AboutItem } from '~/components';
import { AppColors } from '~/constants/app';
import {
  addSocialComment,
  deleteSocialComment,
  getOneSocial,
  updateSocialLikes,
} from '~/modules/feed/actions';
import {
  selectIsOneSocialLoading,
  selectIsSocialCommentDeleting,
  selectIsSocialLikeUpdating,
  selectSelectedItem,
} from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { AboutSocialStackRouteProps } from '~/types/screens';
import { LoadingStateView } from '~/ui';

type Props = {
  route: AboutSocialStackRouteProps;
};

export const AboutSocialScreen: React.VFC<Props> = ({ route }) => {
  const { socialId } = route.params;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsOneSocialLoading);

  const isSocialLikeUpdating = useAppSelector(selectIsSocialLikeUpdating);
  const isSocialCommentDeleting = useAppSelector(selectIsSocialCommentDeleting);
  const { data } = useAppSelector(selectSelectedItem);

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getOneSocial.request({ id: socialId }));
  }, [dispatch, socialId]);

  const handleUpdateLikes = useCallback(() => {
    dispatch(updateSocialLikes.request({ id: socialId, like: !data?.likedByMe }));
  }, [data?.likedByMe, dispatch, socialId]);

  const handleDeleteComment = useCallback(
    (socialId: string) => {
      dispatch(deleteSocialComment.request({ id: socialId }));
    },
    [dispatch],
  );

  const handleSendMessage = useCallback(() => {
    if (data?._id) {
      dispatch(
        addSocialComment.request({
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
      isLikeUpdating={Boolean(isSocialLikeUpdating)}
      isCommentDeleting={Boolean(isSocialCommentDeleting)}
      onDeletePostComment={handleDeleteComment}
      onUpdateLikes={handleUpdateLikes}
      commentText={commentText}
      setCommentText={setCommentText}
      onSendMessage={handleSendMessage}
    />
  );
};

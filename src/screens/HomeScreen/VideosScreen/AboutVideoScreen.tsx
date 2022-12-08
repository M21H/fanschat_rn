import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { AboutItem } from '~/components';
import { AppColors } from '~/constants/app';
import {
  addVideoComment,
  deleteVideoComment,
  getOneVideo,
  updateVideoLikes,
} from '~/modules/feed/actions';
import {
  selectIsOneVideoLoading,
  selectIsVideoCommentDeleting,
  selectIsVideoLikeUpdating,
  selectSelectedItem,
} from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { LoadingStateView } from '~/ui';

type Props = {
  route: {
    params: {
      videoId: string;
    };
  };
};

export const AboutVideoScreen: React.VFC<Props> = ({ route }) => {
  const { videoId } = route.params;

  const dispatch = useAppDispatch();

  const { data } = useAppSelector(selectSelectedItem);

  const isLoading = useAppSelector(selectIsOneVideoLoading);
  const isVideoLikeUpdating = useAppSelector(selectIsVideoLikeUpdating);
  const isVideoCommentDeleting = useAppSelector(selectIsVideoCommentDeleting);

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getOneVideo.request({ id: videoId }));
  }, [dispatch, videoId]);

  const handleSendMessage = (): void => {
    if (data?._id) {
      dispatch(
        addVideoComment.request({
          comment: commentText,
          postId: data?._id,
        }),
      );
    }

    Keyboard.dismiss();
    setCommentText('');
  };

  const handleDeleteComment = useCallback(
    (videoId: string) => {
      dispatch(deleteVideoComment.request({ id: videoId }));
    },
    [dispatch],
  );

  const handleUpdateLikes = useCallback(() => {
    dispatch(updateVideoLikes.request({ id: videoId, like: !data?.likedByMe }));
  }, [data?.likedByMe, dispatch, videoId]);

  if (isLoading) {
    return <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />;
  }

  return (
    <AboutItem
      isLikeUpdating={Boolean(isVideoLikeUpdating)}
      isCommentDeleting={Boolean(isVideoCommentDeleting)}
      onDeletePostComment={handleDeleteComment}
      onUpdateLikes={handleUpdateLikes}
      commentText={commentText}
      setCommentText={setCommentText}
      onSendMessage={handleSendMessage}
    />
  );
};

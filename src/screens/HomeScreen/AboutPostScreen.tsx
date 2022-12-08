import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import { AboutItem } from '~/components';
import { AppColors } from '~/constants/app';
import {
  addPostComment,
  deletePostComment,
  getOnePost,
  updatePostLikes,
} from '~/modules/feed/actions';
import {
  selectIsOnePostLoading,
  selectIsPostCommentDeleting,
  selectIsPostLikeUpdating,
  selectSelectedItem,
} from '~/modules/feed/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { LoadingStateView } from '~/ui';

type Props = {
  route: {
    params: {
      postId: string;
    };
  };
};

export const AboutPostScreen: React.VFC<Props> = ({ route }) => {
  const { postId } = route.params;

  const dispatch = useAppDispatch();

  const { data } = useAppSelector(selectSelectedItem);

  const isLoading = useAppSelector(selectIsOnePostLoading);
  const isPostLikeUpdating = useAppSelector(selectIsPostLikeUpdating);
  const isPostCommentDeleting = useAppSelector(selectIsPostCommentDeleting);

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    dispatch(getOnePost.request({ id: postId }));
  }, [dispatch, postId]);

  const handleSendMessage = (): void => {
    if (data?._id && data?.wallId) {
      dispatch(
        addPostComment.request({
          comment: commentText,

          postId: data?._id,
          wallId: data?.wallId,
        }),
      );
    }

    Keyboard.dismiss();
    setCommentText('');
  };

  const handleDeleteComment = useCallback(
    (postId: string) => {
      dispatch(deletePostComment.request({ id: postId }));
    },
    [dispatch],
  );

  const handleUpdateLikes = useCallback(() => {
    dispatch(updatePostLikes.request({ id: postId, like: !data?.likedByMe }));
  }, [data?.likedByMe, dispatch, postId]);

  if (isLoading) {
    return <LoadingStateView containerStyle={{ backgroundColor: AppColors.primaryLight }} />;
  }

  return (
    <AboutItem
      isLikeUpdating={Boolean(isPostLikeUpdating)}
      isCommentDeleting={Boolean(isPostCommentDeleting)}
      onDeletePostComment={handleDeleteComment}
      onUpdateLikes={handleUpdateLikes}
      commentText={commentText}
      setCommentText={setCommentText}
      onSendMessage={handleSendMessage}
    />
  );
};

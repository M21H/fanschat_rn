import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

import { images } from '~/assets/images';
import { CommentsBlock, Media } from '~/components';
import { CommentsInput } from '~/components/CommentsInput';
import { AppColors, SIZES } from '~/constants/app';
import { useIsAuthorizedModal } from '~/hooks';
import { selectAuthenticatedUser } from '~/modules/authentication/selectors';
import { selectSelectedItem } from '~/modules/feed/selectors';
import { useAppSelector } from '~/store/hooks';
import { Button, NavigationIcon, Text } from '~/ui';
import { Logger } from '~/utils/logger';
import { sw } from '~/utils/scaler';

type Props = {
  isLikeUpdating: boolean;
  isCommentDeleting: boolean;
  commentText: string;
  onUpdateLikes: () => void;
  onSendMessage: () => void;
  onDeletePostComment: (id: string) => void;
  setCommentText: (text: string) => void;
};

export const AboutItem: React.VFC<Props> = ({
  isLikeUpdating,
  isCommentDeleting,
  onUpdateLikes,
  onDeletePostComment,
  commentText,
  setCommentText,
  onSendMessage,
}) => {
  const { data } = useAppSelector(selectSelectedItem);
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const onAuthorized = useIsAuthorizedModal();

  const [lengthMore, setLengthMore] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const toggleNumberOfLines = (): void => {
    setTextShown(!textShown);
  };

  const onShare = async (): Promise<void> => {
    try {
      const result = await Share.share({
        message: 'share mock link',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: ToFix) {
      Logger.log('[onShare error]', error);
    }
  };

  function renderHeader(): React.ReactNode {
    return <Media isEditable={isEditable} />;
  }

  function renderActions(): React.ReactNode {
    return (
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          disabled={isLikeUpdating}
          onPress={() => onAuthorized(onUpdateLikes)}
        >
          <AntDesign
            name="like1"
            size={25}
            color={data?.likedByMe ? AppColors.yellow : AppColors.white}
            style={{ marginRight: 8 }}
          />
          <Text color={AppColors.white} size={16} font="SEMIBOLD">
            {data?.likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => onAuthorized(onShare)}>
          <Feather name="share-2" size={25} color={AppColors.white} style={{ marginRight: 8 }} />
          <Text color={AppColors.white} size={16} font="SEMIBOLD">
            {data?.shareCount}
          </Text>
        </TouchableOpacity>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={styles.action}>
            <Octicons name="mail" size={25} color={AppColors.white} style={{ marginRight: 8 }} />
            <Text color={AppColors.white} size={16} font="SEMIBOLD">
              {data?.commentsCount}
            </Text>
          </View>
          <View
            style={{
              height: 30,
              width: 2,
              backgroundColor: AppColors.white,
              marginHorizontal: 24,
            }}
          />
          <Image
            source={images.logoFanschat}
            style={{ height: 30, width: 30 }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  function renderContent(): React.ReactNode {
    return (
      <View style={styles.content}>
        <Text size={18} color={AppColors.primary} font="BOLD">
          {data?.title}
        </Text>

        <Text
          size={16}
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 4}
          color={AppColors.black}
        >
          {data?.bodyText}
        </Text>
        {lengthMore && (
          <Text size={16} color="#0d6efd" onPress={toggleNumberOfLines}>
            {textShown ? 'READ LESS' : 'READ MORE'}
          </Text>
        )}

        {authenticatedUser && data?.ownerId === authenticatedUser?._id && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isEditable ? (
              <Button
                text="Save"
                containerStyle={{ width: 80, backgroundColor: AppColors.green, marginRight: 10 }}
              />
            ) : (
              <TouchableOpacity onPress={() => setIsEditable(true)}>
                <Text size={16} color={AppColors.green} font="BOLD" style={{ marginRight: 10 }}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => setIsEditable(false)}>
              <Text size={16} color={AppColors.green} font="BOLD" style={{ marginRight: 10 }}>
                {isEditable ? 'Back' : 'Delete'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <CommentsBlock
          isCommentDeleting={isCommentDeleting}
          onDeleteComment={onDeletePostComment}
        />
      </View>
    );
  }

  return (
    <>
      <NavigationIcon />
      <ScrollView style={styles.root}>
        {renderHeader()}
        {renderActions()}
        {renderContent()}
      </ScrollView>

      <CommentsInput
        value={commentText}
        onChangeText={setCommentText}
        placeholder="Enter your comment here.."
        placeholderTextColor={AppColors.grey}
        onSendMessage={onSendMessage}
        isDisabled={!commentText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  video: {
    height: SIZES.height / 4,
    width: '100%',
    backgroundColor: AppColors.white,
  },
  actions: {
    padding: 12,
    flexDirection: 'row',
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    flexDirection: 'row',
  },
  content: {
    padding: SIZES.padding,
    justifyContent: 'space-between',
  },
  seeMoreStyle: {
    textTransform: 'uppercase',
    color: 'red',
  },

  btnSend: {
    width: sw(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});

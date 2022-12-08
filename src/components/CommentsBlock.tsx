import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { images } from '~/assets/images';
import { AppColors, SIZES } from '~/constants/app';
import { selectAuthenticatedUser } from '~/modules/authentication/selectors';
import { selectSelectedItem } from '~/modules/feed/selectors';
import { useAppSelector } from '~/store/hooks';
import { Text } from '~/ui';

type Props = {
  onDeleteComment: (id: string) => void;
  isCommentDeleting: boolean;
};

export const CommentsBlock: React.VFC<Props> = ({ onDeleteComment, isCommentDeleting }) => {
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const { comments } = useAppSelector(selectSelectedItem);

  return (
    <View>
      {comments.length !== 0
        ? comments.map(comment => (
            <View key={comment._id} style={styles.comment}>
              <Image
                source={
                  comment.author.avatarUrl ? { uri: comment.author.avatarUrl } : images.blankProfile
                }
                resizeMode="cover"
                style={styles.commentImg}
              />

              <View style={{ flex: 1 }}>
                <Text font="SEMIBOLD" size={16}>
                  {comment.comment}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text color={AppColors.primary}>
                    {comment.author.displayName} {' |  '}
                  </Text>
                  <Text color={AppColors.primary}>
                    {moment(comment.created).format('MMM D, YYYY')}
                  </Text>
                </View>
              </View>
              {authenticatedUser && comment.authorId === authenticatedUser?._id && (
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                  <TouchableOpacity>
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={AppColors.primary}
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={isCommentDeleting}
                    onPress={() => onDeleteComment(comment._id)}
                  >
                    <MaterialCommunityIcons name="delete" size={25} color={AppColors.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    marginTop: 10,
  },
  commentImg: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: SIZES.padding,
  },
});

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Avatar } from '~/components';
import { Divider } from '~/components';
import { AppColors, SIZES } from '~/constants/app';
import { selectAuthenticatedUser } from '~/modules/authentication/selectors';
import { getMutualFriends } from '~/modules/friends/actions';
import { selectMutualFriends } from '~/modules/friends/selectors';
import { toggleModal } from '~/modules/ui/actions';
import { getOneUser } from '~/modules/users/actions';
import { selectCurrentUser, selectIsCurrentUserLoading } from '~/modules/users/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS } from '~/types/screens';
import { LoadingStateView, NavigationIcon, Text } from '~/ui';

export const UserProfileScreen: React.VFC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const user = useAppSelector(selectCurrentUser);
  const mutualFriends = useAppSelector(selectMutualFriends);
  const isLoadingCurrentUser = useAppSelector(selectIsCurrentUserLoading);
  const isAuthenticatedUser = authenticatedUser?._id === user?._id;

  const navigateToProfile = (userId: string): void => {
    // @ts-ignore
    navigation.navigate(SCREENS.USER_PROFILE);
    dispatch(getOneUser.request({ id: userId }));
    dispatch(getMutualFriends.request({ id: userId }));
  };

  function renderHeader(): React.ReactNode {
    return (
      <View style={styles.profile}>
        <Text size={24} font="BOLD" color={AppColors.primary} style={{ marginBottom: 10 }}>
          User Profile
        </Text>
        <Avatar src={user?.avatarUrl} outline size={60} disable />
        <Text size={24} font="BOLD">
          {user?.displayName}
        </Text>
        {user?.isFriend && <Text size={14}>{isAuthenticatedUser ? 'Me' : 'Friend of mine'}</Text>}
      </View>
    );
  }

  function renderActions(): React.ReactNode {
    return (
      <View style={styles.actions}>
        {user?.isFriend ? (
          <>
            <TouchableOpacity
              style={styles.action}
              // @ts-ignore
              onPress={() => navigation.navigate(SCREENS.CHAT_TAB)}
            >
              <Ionicons name="ios-chatbubble-ellipses" size={30} color={AppColors.green} />
              <Text>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.action, isAuthenticatedUser && styles.disable]}
              disabled={isAuthenticatedUser}
              onPress={() => dispatch(toggleModal({ name: 'unfriendModal' }))}
            >
              <Ionicons name="person-remove" size={30} color={AppColors.green} />
              <Text>Unfriend</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.action, !user?.isFriend && { width: SIZES.width / 2 }]}
            onPress={() => dispatch(toggleModal({ name: 'requestFriendModal' }))}
          >
            <Ionicons name="person-add" size={30} color={AppColors.green} />
            <Text>Send friend request</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.action, !user?.isFriend && { width: SIZES.width / 2 }]}
          onPress={() => dispatch(toggleModal({ name: 'reportModal' }))}
        >
          <FontAwesome5 name="exclamation-triangle" size={30} color={AppColors.green} />
          <Text>Report</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderInfo(): React.ReactNode {
    return (
      <View style={styles.profileInfo}>
        <View style={styles.block}>
          <Text size={21} font="SEMIBOLD" color={AppColors.black}>
            {user?.wallPosts}
          </Text>
          <Text size={16} font="SEMIBOLD" color={AppColors.black}>
            Posts
          </Text>
        </View>
        <Divider style={styles.verticalDivider} />
        <View style={styles.block}>
          <Text size={21} font="SEMIBOLD" color={AppColors.black}>
            {user?.commentsCount}
          </Text>
          <Text size={16} font="SEMIBOLD" color={AppColors.black}>
            Comments
          </Text>
        </View>
        <Divider style={styles.verticalDivider} />
        <View style={styles.block}>
          <Text size={21} font="SEMIBOLD" color={AppColors.black}>
            {mutualFriends.length}
          </Text>
          <Text size={16} font="SEMIBOLD" color={AppColors.black}>
            Friends
          </Text>
        </View>
      </View>
    );
  }

  if (isLoadingCurrentUser) {
    return <LoadingStateView />;
  }

  return (
    <>
      <NavigationIcon />
      <ScrollView>
        {renderHeader()}
        <Divider />
        {renderActions()}
        <Divider />
        {renderInfo()}
        <Divider />

        <Text
          size={16}
          font="SEMIBOLD"
          color={AppColors.primary}
          style={{ textAlign: 'center', marginVertical: 16 }}
        >
          {user?.displayName} Friend List
        </Text>

        <FlatList
          data={mutualFriends}
          horizontal
          listKey="UserProfileScreen"
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Avatar
              src={item.avatarUrl}
              onPress={() => navigateToProfile(item._id)}
              name={item.firstName}
              containerStyle={styles.container}
            />
          )}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    padding: SIZES.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
  },
  action: {
    alignItems: 'center',
    width: SIZES.width / 3,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  disable: {
    opacity: 0.5,
  },
  block: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width / 3,
  },
  verticalDivider: {
    height: '100%',
    width: 1,
  },
  container: {
    marginHorizontal: 16,
    width: 60,
  },
});

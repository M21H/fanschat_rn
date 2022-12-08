import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Avatar, Divider } from '~/components';
import { AppColors, SIZES } from '~/constants/app';
import { getLocation, logOut } from '~/modules/authentication/actions';
import {
  selectAuthenticatedUser,
  selectIsLocationLoading,
  selectIsLogoutLoading,
  selectLocation,
} from '~/modules/authentication/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { AuthUserProfileScreenNavigationProps, SCREENS } from '~/types/screens';
import { Button, LoadingStateView, NavigationIcon, Text } from '~/ui';

export const AuthUserProfileScreen: React.VFC = () => {
  const navigation = useNavigation<AuthUserProfileScreenNavigationProps>();
  const user = useAppSelector(selectAuthenticatedUser);
  const location = useAppSelector(selectLocation);

  const isLoading = useAppSelector(selectIsLogoutLoading);
  const isLocationLoading = useAppSelector(selectIsLocationLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLocation.request());
  }, []);

  function renderMainInfoRow(text: string, ...value: (string | undefined)[]): React.ReactNode {
    return (
      <View style={styles.profileMainInfo}>
        <Text size={16} font="SEMIBOLD">
          {text}
        </Text>
        {value.filter(Boolean).map(value => (
          <Text key={value} size={14} font="REGULAR" numberOfLines={1}>
            {value}
          </Text>
        ))}
      </View>
    );
  }

  function renderInfoRow(text: string, value: number | undefined): React.ReactNode {
    return (
      <Text size={14} font="REGULAR" style={styles.text}>
        {text}
        {'  '}
        <Text size={14} font="SEMIBOLD" color={AppColors.primary}>
          {value}
        </Text>
      </Text>
    );
  }

  if (isLocationLoading) {
    return <LoadingStateView />;
  }

  return (
    <>
      {/* @ts-ignore */}
      <NavigationIcon navigate={() => navigation.navigate(SCREENS.BOTTOM_TABS)} />
      <ScrollView>
        <View style={styles.profile}>
          <Text size={24} font="BOLD" color={AppColors.primary}>
            Profile
          </Text>
          <Avatar src={user?.avatarUrl} level={0} size={60} outline />
          <Text size={16} font="BOLD">
            {user?.displayName}
          </Text>
          <Text size={16}>{`${user?.points} FC Points`}</Text>
          <View>
            <Button
              text="EDIT PROFILE"
              onPress={() => navigation.navigate(SCREENS.EDIT_AUTH_USER_PROFILE)}
            />
          </View>
        </View>
        <Divider />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.profileMainInfoContainer}
        >
          {renderMainInfoRow('Contact info', user?.email, user?.phone)}
          {renderMainInfoRow('Location', `${location?.city}, ${location?.country}`)}
          {renderMainInfoRow('Subscribed since', moment(user?.created).format('MMM D, YYYY'))}
        </ScrollView>
        <Divider />

        <View style={styles.profileInfo}>
          <View style={styles.rightColumn}>
            {renderInfoRow('Caps Level', user?.capsLvL)}
            {renderInfoRow('Days using SSK', user?.daysUsingSSK)}
            {renderInfoRow('Friends', user?.friends.length)}
            {renderInfoRow('Wall posts', user?.wallPosts)}
            {renderInfoRow('Videos watched', user?.videosWatched)}
            {renderInfoRow('Comments made', user?.commentsCount)}
          </View>
          <View style={styles.leftColumn}>
            {renderInfoRow('Chats', user?.chats)}
            {renderInfoRow('Videos chats', user?.videoChats)}
            {renderInfoRow('Public Chats', user?.publicChats)}
            {renderInfoRow('Matches attend (home)', user?.matches)}
            {renderInfoRow('Matches attend (away)', user?.matches)}
            {renderInfoRow('Likes received', user?.receivedLikes)}
          </View>
        </View>
        <Divider />
        <Button
          text="LOGOUT"
          containerStyle={{
            marginVertical: SIZES.padding,
            width: 150,
          }}
          isLoading={Boolean(isLoading)}
          disabled={Boolean(isLoading)}
          onPress={() => dispatch(logOut.request())}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    height: SIZES.height / 3,
    padding: SIZES.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileMainInfoContainer: {
    flexGrow: 1,
    padding: SIZES.padding,
    justifyContent: 'space-between',
  },
  profileMainInfo: {
    minWidth: SIZES.width / 3,
    paddingRight: SIZES.padding,
  },
  profileInfo: {
    paddingVertical: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  leftColumn: {
    alignItems: 'flex-start',
  },
  text: {
    marginBottom: 5,
  },
});

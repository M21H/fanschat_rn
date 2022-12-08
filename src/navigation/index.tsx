import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React, { useMemo } from 'react';

import {
  EditAuthProfileScreen,
  LoginScreen,
  PrivacyPolicyScreen,
  RegistrationScreen,
  ResetPasswordScreen,
} from '~/modules/authentication/screens';
import { selectWasRegistrationCompleted } from '~/modules/authentication/selectors';
import { AuthUserProfileScreen, UserProfileScreen } from '~/modules/profile/screens';
import {
  AboutNewsScreen,
  AboutPostScreen,
  AboutSocialScreen,
  AboutStreaming,
  ChatTabGroupsScreen,
  CreatePostScreen,
  HomeTabFriendsScreen,
  NotificationScreen,
} from '~/screens';
import { AboutVideoScreen } from '~/screens/HomeScreen/VideosScreen';
import { useAppSelector } from '~/store/hooks';
import { MainStackParamList, SCREENS } from '~/types/screens';

import { TabNavigator } from './TabsNavigator';

export const AppNavigator: React.VFC = () => {
  const isAuthenticated = useAppSelector(selectWasRegistrationCompleted);

  const Stack = createStackNavigator<MainStackParamList>();

  const BaseOption: StackNavigationOptions = useMemo(
    () => ({
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }),
    [],
  );

  return (
    <Stack.Navigator
      screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      initialRouteName={isAuthenticated ? SCREENS.AUTH_USER_PROFILE : SCREENS.BOTTOM_TABS}
    >
      <Stack.Group>
        <Stack.Screen name={SCREENS.BOTTOM_TABS} component={TabNavigator} options={BaseOption} />
        <Stack.Screen name={SCREENS.ABOUT_POST} component={AboutPostScreen} options={BaseOption} />

        <Stack.Screen
          name={SCREENS.CHAT_TAB_GROUPS}
          component={ChatTabGroupsScreen}
          options={BaseOption}
        />

        <Stack.Screen
          name={SCREENS.ABOUT_VIDEO}
          component={AboutVideoScreen}
          options={BaseOption}
        />
        <Stack.Screen name={SCREENS.ABOUT_NEWS} component={AboutNewsScreen} options={BaseOption} />
        <Stack.Screen
          name={SCREENS.ABOUT_SOCIAL}
          component={AboutSocialScreen}
          options={BaseOption}
        />
        <Stack.Screen
          name={SCREENS.ABOUT_STREAMING}
          component={AboutStreaming}
          options={BaseOption}
        />
        {/* <Stack.Screen
          name={SCREENS.NOTIFICATIONS}
          component={NotificationScreen}
          options={BaseOption}
        /> */}
      </Stack.Group>

      {isAuthenticated ? (
        <>
          <Stack.Screen
            name={SCREENS.AUTH_USER_PROFILE}
            component={AuthUserProfileScreen}
            options={BaseOption}
          />
          <Stack.Screen
            name={SCREENS.EDIT_AUTH_USER_PROFILE}
            component={EditAuthProfileScreen}
            options={BaseOption}
          />

          <Stack.Screen
            name={SCREENS.USER_PROFILE}
            component={UserProfileScreen}
            options={BaseOption}
          />
          <Stack.Screen
            name={SCREENS.NOTIFICATIONS}
            component={NotificationScreen}
            options={BaseOption}
          />
          <Stack.Screen
            name={SCREENS.FRIENDS}
            component={HomeTabFriendsScreen}
            options={BaseOption}
          />
          <Stack.Screen
            name={SCREENS.CREATE_POST}
            component={CreatePostScreen}
            options={BaseOption}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} options={BaseOption} />
          <Stack.Screen
            name={SCREENS.REGISTRATION}
            component={RegistrationScreen}
            options={BaseOption}
          />
          <Stack.Screen
            name={SCREENS.RESET_PASSWORD}
            component={ResetPasswordScreen}
            options={BaseOption}
          />
          <Stack.Screen
            name={SCREENS.PRIVACY_POLICY}
            component={PrivacyPolicyScreen}
            options={BaseOption}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

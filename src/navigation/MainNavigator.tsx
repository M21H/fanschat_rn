import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { UserProfileScreen } from '~/modules/profile/screens';
import { AuthUserProfileScreen } from '~/modules/profile/screens/AuthUserProfileScreen';
import { HomeTabFriendsScreen } from '~/screens';
import { MainStackParamList, SCREENS } from '~/types/screens';

import { TabNavigator } from './TabsNavigator';

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator: React.VFC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.BOTTOM_TABS} component={TabNavigator} />
      {/* <Stack.Screen name={SCREENS.NOTIFICATIONS} component={NotificationScreen} /> */}
      <Stack.Screen name={SCREENS.FRIENDS} component={HomeTabFriendsScreen} />
      <Stack.Screen
        name={SCREENS.AUTH_USER_PROFILE}
        component={AuthUserProfileScreen}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={SCREENS.USER_PROFILE}
        component={UserProfileScreen}
        options={{ gestureEnabled: true }}
      />
    </Stack.Navigator>
  );
};

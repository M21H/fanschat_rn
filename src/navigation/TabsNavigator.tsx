import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors } from '~/constants/app';
import { ChatTabScreen, NewsTabScreen, SocialTabScreen } from '~/screens';
import { HomeTabScreen } from '~/screens/HomeScreen/HomeTabScreen';
import { VideosScreen } from '~/screens/HomeScreen/VideosScreen';
import { BottomTabBarParamList, SCREENS } from '~/types/screens';
import { sh } from '~/utils/scaler';

import {
  ChatTabBarIcon,
  HomeTabBarIcon,
  NewsTabBarIcon,
  SocialTabBarIcon,
  VideoTabBarIcon,
} from './TabIcons';

const Tab = createBottomTabNavigator<BottomTabBarParamList>();

export const TabNavigator: React.VFC = () => {
  const insets = useSafeAreaInsets();

  const bottomTabBarOptions: BottomTabNavigationOptions = useMemo(
    () => ({
      headerShown: true,
      tabBarStyle: {
        backgroundColor: AppColors.black,
        height: sh(45) + insets.bottom,
        borderTopWidth: 0,
        elevation: 14,
      },
    }),
    [insets],
  );

  const HomeScreenOptions: BottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarShowLabel: false,
      tabBarIcon: HomeTabBarIcon,
      headerShown: false,
    };
  }, []);

  const ChatScreeOptions: BottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarShowLabel: false,
      tabBarIcon: ChatTabBarIcon,
      headerShown: false,
    };
  }, []);

  const NewsScreeOptions: BottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarShowLabel: false,
      tabBarIcon: NewsTabBarIcon,
      headerShown: false,
    };
  }, []);

  const SocialScreeOptions: BottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarShowLabel: false,
      tabBarIcon: SocialTabBarIcon,
      headerShown: false,
    };
  }, []);

  const VideoScreeOptions: BottomTabNavigationOptions = useMemo(() => {
    return {
      tabBarShowLabel: false,
      tabBarIcon: VideoTabBarIcon,
      headerShown: false,
    };
  }, []);

  return (
    <Tab.Navigator screenOptions={bottomTabBarOptions}>
      <Tab.Screen name={SCREENS.HOME_TAB} component={HomeTabScreen} options={HomeScreenOptions} />
      <Tab.Screen name={SCREENS.CHAT_TAB} component={ChatTabScreen} options={ChatScreeOptions} />
      <Tab.Screen name={SCREENS.NEWS_TAB} component={NewsTabScreen} options={NewsScreeOptions} />
      <Tab.Screen name={SCREENS.VIDEOS} component={VideosScreen} options={VideoScreeOptions} />
      <Tab.Screen
        name={SCREENS.SOCIAL_TAB}
        component={SocialTabScreen}
        options={SocialScreeOptions}
      />
      {/* <Tab.Screen
        name={SCREENS.MENU_TAB}
        component={MenuTabNavigation}
        options={MenuScreeOptions}
      /> */}
    </Tab.Navigator>
  );
};

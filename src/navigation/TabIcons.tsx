import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors } from '~/constants/app';

type BottomTabBarIconProps = {
  focused: boolean;
};

const ICON_SIZE = 25;

export const HomeTabBarIcon: React.VFC<BottomTabBarIconProps> = ({ focused }) => {
  return <Entypo name="home" color={focused ? AppColors.green : AppColors.grey} size={ICON_SIZE} />;
};

export const ChatTabBarIcon: React.VFC<BottomTabBarIconProps> = ({ focused }) => {
  return (
    <Ionicons
      name="ios-chatbubble-ellipses"
      color={focused ? AppColors.green : AppColors.grey}
      size={ICON_SIZE}
    />
  );
};

export const NewsTabBarIcon: React.VFC<BottomTabBarIconProps> = ({ focused }) => {
  return (
    <Ionicons
      name="newspaper-sharp"
      color={focused ? AppColors.green : AppColors.grey}
      size={ICON_SIZE}
    />
  );
};

export const SocialTabBarIcon: React.VFC<BottomTabBarIconProps> = ({ focused }) => {
  return (
    <AntDesign name="like1" color={focused ? AppColors.green : AppColors.grey} size={ICON_SIZE} />
  );
};

export const MenuTabBarIcon: React.VFC<BottomTabBarIconProps> = ({ focused }) => {
  return <Entypo name="menu" color={focused ? AppColors.green : AppColors.grey} size={ICON_SIZE} />;
};

export const VideoTabBarIcon: React.VFC<BottomTabBarIconProps> = ({ focused }) => {
  return (
    <Ionicons name="ios-tv" color={focused ? AppColors.green : AppColors.grey} size={ICON_SIZE} />
  );
};

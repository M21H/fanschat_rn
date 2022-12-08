import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum SCREENS {
  LOGIN = 'LoginScreen',
  REGISTRATION = 'RegistrationScreen',
  RESET_PASSWORD = 'ResetPasswordScreen',
  PRIVACY_POLICY = 'PrivacyPolicyScreen',

  NOTIFICATIONS = 'NotificationsScreen',
  FRIENDS = 'FriendsScreen',
  AUTH_USER_PROFILE = 'AuthProfileScreen',
  EDIT_AUTH_USER_PROFILE = 'EditAuthUserProfile',
  USER_PROFILE = 'UserProfileScreen',

  BOTTOM_TABS = 'BottomTabs',

  HOME_TAB = 'HomeTabScreen',
  CHAT_TAB = 'ChatTabScreen',
  CHAT_TAB_GROUPS = 'ChatTabGroups',

  NEWS_TAB = 'NewsTabScreen',
  SOCIAL_TAB = 'SocialTabScreen',
  MENU_TAB = 'MenuTabScreen',

  CREATE_POST = 'CreatePostScreen',

  VIDEOS = 'VideoScreen',

  ABOUT_POST = 'AboutPostScreen',
  ABOUT_STREAMING = 'AboutStreamingScreen',
  ABOUT_VIDEO = 'AboutVideoScreen',
  ABOUT_NEWS = 'AboutNewsScreen',
  ABOUT_SOCIAL = 'AboutSocialScreen',
}

export type MainStackParamList = {
  [SCREENS.BOTTOM_TABS]: NavigatorScreenParams<BottomTabBarParamList>;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.REGISTRATION]: undefined;
  [SCREENS.RESET_PASSWORD]: undefined;
  [SCREENS.PRIVACY_POLICY]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
  [SCREENS.FRIENDS]: undefined;
  [SCREENS.VIDEOS]: { title: string };
  [SCREENS.AUTH_USER_PROFILE]: undefined;
  [SCREENS.EDIT_AUTH_USER_PROFILE]: undefined;
  [SCREENS.USER_PROFILE]: undefined;

  [SCREENS.HOME_TAB]: undefined;
  [SCREENS.CHAT_TAB]: undefined;
  [SCREENS.CHAT_TAB_GROUPS]: undefined;
  [SCREENS.NEWS_TAB]: undefined;
  [SCREENS.SOCIAL_TAB]: undefined;

  [SCREENS.CREATE_POST]: undefined;
  [SCREENS.ABOUT_VIDEO]: { videoId: string };
  [SCREENS.ABOUT_STREAMING]: undefined;
  [SCREENS.ABOUT_POST]: { postId: string };
  [SCREENS.ABOUT_NEWS]: { newsId: string };
  [SCREENS.ABOUT_SOCIAL]: { socialId: string };
};

export type BottomTabBarParamList = {
  [SCREENS.HOME_TAB]: NavigatorScreenParams<HomeTabStackParamList>;
  [SCREENS.NEWS_TAB]: NavigatorScreenParams<NewsTabStackParamList>;
  [SCREENS.CHAT_TAB]: NavigatorScreenParams<ChatTabGroupsStackParamList>;
  [SCREENS.SOCIAL_TAB]: NavigatorScreenParams<ToFix>;
  [SCREENS.MENU_TAB]: NavigatorScreenParams<ToFix>;
  [SCREENS.VIDEOS]: NavigatorScreenParams<ToFix>;
};
export type HomeTabStackParamList = {
  [SCREENS.CREATE_POST]: undefined;
};

export type ChatTabGroupsStackParamList = {
  [SCREENS.CHAT_TAB_GROUPS]: undefined;
};

export type NewsTabStackParamList = {
  [SCREENS.ABOUT_NEWS]: undefined;
};

export type AppBarNavigationProp = StackNavigationProp<MainStackParamList, SCREENS.HOME_TAB>;

export type HomeTabScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  SCREENS.CREATE_POST
>;

export type PrivacyPolicyScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  SCREENS.HOME_TAB
>;

export type AboutNewsStackRouteProps = RouteProp<MainStackParamList, SCREENS.ABOUT_NEWS>;
export type AboutSocialStackRouteProps = RouteProp<MainStackParamList, SCREENS.ABOUT_SOCIAL>;
export type VideoScreenStackRouteProps = RouteProp<MainStackParamList, SCREENS.VIDEOS>;

export type NewsTabScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  SCREENS.ABOUT_NEWS
>;
export type SocialTabScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  SCREENS.ABOUT_SOCIAL
>;
export type VideoScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  SCREENS.ABOUT_VIDEO
>;
export type FriendsTabsScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  SCREENS.USER_PROFILE
>;
export type AuthUserProfileScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  SCREENS.BOTTOM_TABS
>;

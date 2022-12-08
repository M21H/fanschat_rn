import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';

import { toastConfig } from '~/common/toastConfig';
import { AppBar } from '~/components';
import { AuthModal, ReportModal, RequestFriendModal, UnfriendModal } from '~/components/Modals';
import { AppColors } from '~/constants/app';
import { AppNavigator } from '~/navigation';

export const App: React.VFC = () => {
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  const navigationContainerTheme: Theme = useMemo(() => {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: AppColors.white,
        primary: AppColors.black,
      },
    };
  }, []);

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationContainerTheme}>
      <AppBar />
      <AppNavigator />
      <Toast config={toastConfig} />
      <AuthModal />
      <UnfriendModal />
      {/* <NotificationsModal /> */}
      <ReportModal />
      <RequestFriendModal />
    </NavigationContainer>
  );
};

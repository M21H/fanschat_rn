import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { images } from '~/assets/images';
import { AppColors, SIZES } from '~/constants/app';
import { selectWasRegistrationCompleted } from '~/modules/authentication/selectors';
import { selectTickerMessages } from '~/modules/feed/selectors';
import { useAppSelector } from '~/store/hooks';
import { AppBarNavigationProp, SCREENS } from '~/types/screens';
import { PressableIcon, Text } from '~/ui';

export const AppBar: React.VFC = () => {
  // const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectWasRegistrationCompleted);
  const tickerMessages = useAppSelector(selectTickerMessages);

  const navigation = useNavigation<AppBarNavigationProp>();
  return (
    <>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Pressable onPress={() => navigation.navigate(SCREENS.HOME_TAB)}>
            <Image source={images.scpLogoIncText} style={styles.logo} />
          </Pressable>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isAuthenticated && (
              <PressableIcon onPress={() => navigation.navigate(SCREENS.NOTIFICATIONS)}>
                <Ionicons name="md-notifications" size={25} color={AppColors.black} />
              </PressableIcon>
            )}

            <PressableIcon
              onPress={() => navigation.navigate(isAuthenticated ? SCREENS.FRIENDS : SCREENS.LOGIN)}
            >
              <FontAwesome5 name="user-friends" size={25} color={AppColors.black} />
            </PressableIcon>
          </View>
        </View>
      </SafeAreaView>
      {tickerMessages && (
        <View style={styles.carousel}>
          <Text size={16} font="SEMIBOLD" color={AppColors.white}>
            123
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: AppColors.green,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
  },
  carousel: {
    backgroundColor: AppColors.greenDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

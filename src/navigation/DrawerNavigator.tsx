import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';

import { SCREENS } from '~/types/screens';
import { Text } from '~/ui';

const Drawer = createDrawerNavigator();

const Menu: React.VFC = () => {
  return (
    <View>
      <Text>123</Text>
    </View>
  );
};

export const MenuTabNavigation: React.VFC = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name={SCREENS.MENU_TAB} component={Menu} />
    </Drawer.Navigator>
  );
};

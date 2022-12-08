import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { AppColors, SIZES } from '~/constants/app';
import { TabType } from '~/models';

import { Tab } from './Tab';

type Props = {
  tabs: TabType[];
};

export const Tabs: React.VFC<Props> = ({ tabs }) => {
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap(
    Object.assign(
      {},
      ...tabs.map(tab => {
        return { [tab.key]: tab.Component };
      }),
    ),
  );

  const renderTabBar = (props: ToFix): React.ReactNode => {
    return (
      <View style={styles.root}>
        {props.navigationState.routes.map((route: TabType, i: number, arr: TabType[]) => (
          <Tab
            title={route.title}
            isActive={index === i}
            key={route.key}
            onPress={() => setIndex(i)}
            containerStyle={
              i !== arr.length - 1 && {
                borderRightWidth: 0.2,
                borderRightColor: AppColors.grey80,
              }
            }
          />
        ))}
      </View>
    );
  };

  return (
    <TabView
      lazy
      navigationState={{ index, routes: tabs }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: SIZES.width }}
      swipeEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: AppColors.white,
    borderBottomColor: AppColors.grey80,
    borderBottomWidth: 0.2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tabActive: {
    backgroundColor: AppColors.primary,
  },
  tabNotActive: {
    borderRightColor: AppColors.primary,
    borderLeftWidth: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: AppColors.black,
  },
});

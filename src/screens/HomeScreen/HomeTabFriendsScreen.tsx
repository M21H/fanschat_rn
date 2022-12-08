import React from 'react';

import { Tabs } from '~/components';
import { TabType } from '~/models';
import { NavigationIcon } from '~/ui';

import { FindTab, FriendsTab, RequestsTab } from '../AppBarTabsScreens';

const TABS: TabType[] = [
  { key: 'friends', title: 'friends', Component: FriendsTab },
  { key: 'find', title: 'find', Component: FindTab },
  { key: 'requests', title: 'requests', Component: RequestsTab },
];

export const HomeTabFriendsScreen: React.VFC = () => {
  return (
    <>
      <NavigationIcon />
      <Tabs tabs={TABS} />
    </>
  );
};

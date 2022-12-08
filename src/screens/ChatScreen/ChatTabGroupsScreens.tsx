import React from 'react';

import { Tabs } from '~/components';
import { TabType } from '~/models';
import { NavigationIcon } from '~/ui';

import { CreateChatTabScreen, JoinChatTabScreen } from './TabsScreens';

const TABS: TabType[] = [
  { key: 'createChat', title: 'create chat', Component: CreateChatTabScreen },
  { key: 'joinChat', title: 'join chat', Component: JoinChatTabScreen },
];

export const ChatTabGroupsScreen: React.VFC = () => {
  return (
    <>
      <NavigationIcon />
      <Tabs tabs={TABS} />
    </>
  );
};

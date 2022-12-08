import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { SearchInput } from '~/components';
import { getMutualFriends } from '~/modules/friends/actions';
import { getAllUsers, getOneUser } from '~/modules/users/actions';
import { useAppDispatch } from '~/store/hooks';
import { SCREENS } from '~/types/screens';

import { UsersList } from './components';

export const FindTab: React.VFC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getAllUsers.request({ search }));
    return () => {
      dispatch(getAllUsers.reset());
    };
  }, [dispatch, search]);

  const navigateToProfile = useCallback(
    (userId: string): void => {
      // @ts-ignore
      navigation.navigate(SCREENS.USER_PROFILE);
      dispatch(getOneUser.request({ id: userId }));
      dispatch(getMutualFriends.request({ id: userId }));
    },
    [dispatch, navigation],
  );

  return (
    <>
      <SearchInput value={search} setValue={setSearch} placeholder="Search for friends..." />
      <UsersList onPressUser={navigateToProfile} />
    </>
  );
};

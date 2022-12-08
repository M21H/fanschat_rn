import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { SIZES } from '~/constants/app';
import { getAllFriends, getMutualFriends } from '~/modules/friends/actions';
import { selectAllFriends, selectIsAllFriendsLoading } from '~/modules/friends/selectors';
import { getOneUser } from '~/modules/users/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { SCREENS } from '~/types/screens';
import { EmptyListView, LoadingStateView } from '~/ui';

import { Avatar } from './components';

export const FriendsTab: React.VFC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const friends = useAppSelector(selectAllFriends);
  const isLoading = useAppSelector(selectIsAllFriendsLoading);
  // const totalPages = useAppSelector(selectTotalFriendsPages);
  const [page] = useState(1);

  const navigateToProfile = useCallback(
    (userId: string): void => {
      // @ts-ignore
      navigation.navigate(SCREENS.USER_PROFILE);
      dispatch(getOneUser.request({ id: userId }));
      dispatch(getMutualFriends.request({ id: userId }));
    },
    [dispatch, navigation],
  );

  const fetchData = useCallback((): void => {
    dispatch(getAllFriends.request({ page }));
  }, [dispatch]);

  useEffect(() => {
    fetchData();

    return () => {
      dispatch(getAllFriends.reset());
    };
  }, [fetchData, page]);

  // const fetchMoreData = (): void => {
  //   if (totalPages) {
  //     if (page < totalPages) {
  //       setPage(page => page + 1);
  //     }
  //   }
  // };

  if (isLoading) {
    return <LoadingStateView containerStyle={styles.indicator} />;
  }

  return (
    <FlatList
      data={friends}
      listKey="FriendsTab"
      keyExtractor={item => item._id}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item }) => (
        <Avatar
          src={item?.avatarUrl}
          name={item.displayName}
          onPress={() => navigateToProfile(item._id)}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: SIZES.width / 3,
          }}
        />
      )}
      numColumns={3}
      showsVerticalScrollIndicator
      onEndReachedThreshold={0.3}
      ListEmptyComponent={
        <EmptyListView text="Not found users." containerStyle={styles.indicator} />
      }
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
  },
});

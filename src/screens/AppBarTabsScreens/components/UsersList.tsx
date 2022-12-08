import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { SIZES } from '~/constants/app';
import { getAllUsers } from '~/modules/users/actions';
import { selectAllUsers, selectIsAllUserLoading } from '~/modules/users/selectors';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { EmptyListView, LoadingStateView } from '~/ui';
import { sh } from '~/utils/scaler';

import { Avatar } from './Avatar';

type Props = {
  onPressUser?: (userId: string) => void;
};

export const UsersList: React.VFC<Props> = ({ onPressUser }) => {
  const users = useAppSelector(selectAllUsers);
  const isLoading = useAppSelector(selectIsAllUserLoading);
  // const totalPages = useAppSelector(selectTotalUsersPages);
  const [page] = useState(1);
  const dispatch = useAppDispatch();

  const fetchData = (): void => {
    dispatch(getAllUsers.request({ page }));
  };

  // const fetchMoreData = (): void => {
  //   if (page < totalPages) {
  //     setPage(page => page + 1);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingStateView containerStyle={styles.indicator} />;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={item => item._id}
      contentContainerStyle={{ flexGrow: 1 }}
      listKey="userList"
      renderItem={({ item }) => (
        <Avatar
          src={item?.avatarUrl}
          name={item.displayName}
          onPress={() => (onPressUser ? onPressUser(item._id) : () => {})}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: SIZES.width / 3,
          }}
        />
      )}
      ListEmptyComponent={
        <EmptyListView text="Not found users." containerStyle={styles.indicator} />
      }
      numColumns={3}
      showsVerticalScrollIndicator
      horizontal={false}
      onEndReachedThreshold={0.2}
      // onEndReached={fetchMoreData}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    marginTop: -sh(100) - 1,
  },
});

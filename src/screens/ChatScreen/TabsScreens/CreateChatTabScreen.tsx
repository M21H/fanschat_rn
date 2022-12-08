import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Divider } from '~/components';
import { AppColors, SIZES } from '~/constants/app';
import { IUser } from '~/models';
import { getAllFriends } from '~/modules/friends/actions';
import { selectAllFriends, selectIsAllFriendsLoading } from '~/modules/friends/selectors';
import { Avatar } from '~/screens/AppBarTabsScreens/components';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Button, LoadingStateView, Text } from '~/ui';

export const CreateChatTabScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const friends = useAppSelector(selectAllFriends);
  const isLoading = useAppSelector(selectIsAllFriendsLoading);

  const [isChatPublic, setIsChatPublic] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<IUser[]>([]);

  const [searchFriend, setSearchFriend] = useState('');

  const toggleChatPublicSwitch = useCallback((): void => setIsChatPublic(prev => !prev), []);

  const handleSelectFriendToChat = useCallback(
    (user: IUser): void => {
      const isExist = selectedFriends.some(friend => friend._id === user._id);
      if (isExist) {
        setSelectedFriends(selectedFriend =>
          selectedFriend.filter(friend => friend._id !== user._id),
        );
      } else {
        setSelectedFriends(selectedFriend => [...selectedFriend, user]);
      }
    },
    [selectedFriends],
  );

  useEffect(() => {
    dispatch(getAllFriends.request({ perPage: 1000 }));
    return () => {
      dispatch(getAllFriends.reset());
      setSelectedFriends([]);
    };
  }, [dispatch]);

  function renderNameInput(): React.ReactNode {
    return (
      <View style={styles.inputNameContainer}>
        <TextInput
          style={styles.inputName}
          placeholder="Enter a name for your chat"
          autoCapitalize="none"
          placeholderTextColor={AppColors.grey}
        />
        <TouchableOpacity style={styles.inputNameIcon}>
          <FontAwesome name="camera" color={AppColors.white} size={20} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderSearchFriendsInput(): React.ReactNode {
    return (
      <>
        <View style={{ margin: SIZES.padding }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.inputFriendContainer]}>
              <TextInput
                numberOfLines={1}
                style={styles.inputFriend}
                placeholder="Search your friends"
                value={searchFriend}
                autoCapitalize="none"
                onChangeText={setSearchFriend}
                placeholderTextColor={AppColors.grey}
              />
              <TouchableOpacity style={styles.inputFriendIcon}>
                <Feather name="search" size={20} color={AppColors.black} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
              <Text color={AppColors.grey} font="SEMIBOLD" style={{ marginRight: 10 }}>
                This chat is public
              </Text>
              <Switch
                onValueChange={toggleChatPublicSwitch}
                trackColor={{ true: AppColors.green }}
                thumbColor={AppColors.white}
                value={isChatPublic}
              />
            </View>
          </View>
        </View>
        <Divider />
      </>
    );
  }

  function renderGroupFriendsList(): React.ReactNode {
    return (
      <View
        style={{
          backgroundColor: AppColors.grey100,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          size={16}
          font="SEMIBOLD"
          style={{ marginVertical: SIZES.padding / 2, alignSelf: 'center', textAlign: 'center' }}
          color={AppColors.green}
        >
          {selectedFriends.length} Friends in chat
        </Text>
        <FlatList
          data={selectedFriends}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            backgroundColor: 'transparent',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Avatar
              src={item?.avatarUrl}
              name={item.displayName}
              onPress={() => handleSelectFriendToChat(item)}
              selectedIcon={
                selectedFriends.some(friend => friend._id === item._id) ? (
                  <AntDesign name="closecircle" size={25} color="red" style={styles.icon} />
                ) : undefined
              }
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: SIZES.width / 4,
              }}
            />
          )}
        />
        <Button
          text="Create Chat"
          size={16}
          font="SEMIBOLD"
          disabled={selectedFriends.length === 0}
          containerStyle={{
            backgroundColor: AppColors.green,
            marginBottom: insets.bottom === 0 ? SIZES.padding / 2 : insets.bottom,
            width: SIZES.width - SIZES.padding * 2,
          }}
        />
      </View>
    );
  }

  if (isLoading) {
    return <LoadingStateView />;
  }

  return (
    <View style={styles.root}>
      {renderNameInput()}
      {renderSearchFriendsInput()}
      <FlatList
        data={friends}
        keyExtractor={item => item._id}
        contentContainerStyle={{ flexGrow: 1 }}
        listKey="userList"
        renderItem={({ item }) => (
          <Avatar
            src={item?.avatarUrl}
            name={item.displayName}
            selectedIcon={
              selectedFriends.some(friend => friend._id === item._id) ? (
                <Ionicons
                  name="ios-checkmark-circle"
                  color={AppColors.green}
                  size={30}
                  style={styles.icon}
                />
              ) : undefined
            }
            onPress={() => handleSelectFriendToChat(item)}
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: SIZES.width / 4,
            }}
          />
        )}
        numColumns={4}
        showsVerticalScrollIndicator
        horizontal={false}
        onEndReachedThreshold={0.2}
      />
      {renderGroupFriendsList()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  inputNameContainer: {
    flexDirection: 'row',
  },
  inputName: {
    backgroundColor: AppColors.lightGray,
    fontSize: 16,
    padding: 10,
    flex: 1,
  },
  inputFriendContainer: {
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    backgroundColor: AppColors.lightGray,
  },

  inputFriend: {
    backgroundColor: AppColors.lightGray,
    fontSize: 16,
    padding: 10,
    borderRadius: 50,
    flex: 1,
  },
  inputNameIcon: {
    width: 50,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primary,
  },
  inputFriendIcon: {
    backgroundColor: AppColors.lightGray,
    borderRadius: 20,
    marginRight: 10,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 15,
    zIndex: 10,
  },
});

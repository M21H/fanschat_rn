import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchInput } from '~/components';
import { AppColors, SIZES } from '~/constants/app';
import { Text } from '~/ui';

export const JoinChatTabScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
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
          Public chats your friends are in
        </Text>
        <FlatList
          data={Array.from({ length: 10 }, (_, i) => i + 1)}
          keyExtractor={item => item.toString()}
          contentContainerStyle={{
            backgroundColor: 'transparent',
            marginBottom: insets.bottom === 0 ? SIZES.padding / 2 : insets.bottom,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: SIZES.padding / 2 }}>
              <Image
                source={{
                  uri: 'https://fanschat1mtn1wamplify164446-dev.s3.eu-central-1.amazonaws.com/public/1658832270427zO6tqvN2bBvMNuDEd5wk.png',
                }}
                style={{ height: 60, width: 60, borderRadius: 30 }}
                resizeMode="cover"
              />
              <Text style={{ textAlign: 'center' }}>SCP {item}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <>
      <SearchInput value="" setValue={() => {}} placeholder="Search chats groups" />

      <FlatList
        data={[]}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={() => null}
        showsVerticalScrollIndicator
        horizontal={false}
        onEndReachedThreshold={0.2}
      />

      {renderGroupFriendsList()}
    </>
  );
};

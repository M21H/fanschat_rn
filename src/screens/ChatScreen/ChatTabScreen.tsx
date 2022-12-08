import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Avatar, Divider } from '~/components';
import { AppColors } from '~/constants/app';
import { SCREENS } from '~/types/screens';
import { NavigationIcon, Text } from '~/ui';
import { sh } from '~/utils/scaler';

const MOCK_GROUP = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
];

export const ChatTabScreen: React.VFC = () => {
  const navigation = useNavigation();
  function renderChatBottomActions(): React.ReactNode {
    return (
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.bottomAction}>
          <FontAwesome name="microphone" color={AppColors.black} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomAction}>
          <FontAwesome name="camera" color={AppColors.black} size={22} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter your message here"
          placeholderTextColor={AppColors.grey}
        />

        <TouchableOpacity style={styles.bottomAction}>
          <Ionicons name="md-send-sharp" size={22} color={AppColors.black} />
        </TouchableOpacity>
        <View style={styles.bottomAction}>
          <Divider
            style={{
              width: 2,
              height: '100%',
              backgroundColor: AppColors.black,
              marginVertical: 5,
            }}
          />
        </View>

        <TouchableOpacity style={styles.bottomAction}>
          <Entypo name="dots-three-horizontal" size={22} color={AppColors.black} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderConversations(): React.ReactNode {
    return (
      <View style={styles.conversation}>
        <Text size={14}>Start conversations</Text>
      </View>
    );
  }

  function renderGroup(): React.ReactNode {
    return (
      <>
        <View style={styles.group}>
          <NavigationIcon />
          <FlatList
            data={MOCK_GROUP}
            contentContainerStyle={{ flex: 1, marginLeft: 50 }}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            renderItem={() => (
              <Avatar
                src={undefined}
                size={40}
                containerStyle={{ marginRight: 15, marginVertical: 5 }}
              />
            )}
          />
          <TouchableOpacity
            style={styles.groupIcon}
            // @ts-ignore
            onPress={() => navigation.navigate(SCREENS.CHAT_TAB_GROUPS)}
          >
            <AntDesign name="plus" color={AppColors.primary} size={20} />
          </TouchableOpacity>
        </View>

        <Text size={16} color={AppColors.primary} style={{ textAlign: 'center' }}>
          test
        </Text>
      </>
    );
  }

  return (
    <View style={styles.root}>
      {renderGroup()}
      {renderConversations()}
      {renderChatBottomActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: AppColors.lightGray,
  },
  groupIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  conversation: {
    flex: 1,
    backgroundColor: AppColors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    height: sh(50),
    backgroundColor: AppColors.grey100,
    padding: 5,
  },
  bottomAction: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    backgroundColor: AppColors.grey100,
    fontSize: 16,
    marginHorizontal: 5,
  },
});

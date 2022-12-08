import React, { useCallback, useState } from 'react';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

import { images } from '~/assets/images';
import { AppColors } from '~/constants/app';
import { NavigationIcon, Text } from '~/ui';
import { isIOS } from '~/utils/platforms';

interface IFile extends File {
  uri: string;
}

export const CreatePostScreen: React.VFC = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const [file, setFile] = useState<IFile | null>(null);
  const isVideo = file?.type.split('/')[0] === 'video';

  const handleChooseFile = useCallback(
    async (type: ImageLibraryOptions['mediaType']): Promise<void> => {
      const options: ImageLibraryOptions = {
        mediaType: type,
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.5,
      };

      try {
        Keyboard.dismiss();
        const { didCancel, assets } = await launchImageLibrary(options);
        if (!didCancel && assets) {
          const file = assets[0];
          if (file.uri) {
            setFile({
              name: file.fileName,
              type: file.type,
              uri: isIOS ? file.uri.replace('file://', '') : file.uri,
            } as IFile);
          }
        }
      } catch (error) {
        setFile(null);
      }
    },
    [],
  );

  const handleSubmitPost = (): void => {
    console.log('file', file);
  };

  function renderActionButtons(): React.ReactNode {
    return (
      <View style={[StyleSheet.absoluteFill, styles.actions]}>
        <TouchableOpacity style={styles.icon} onPress={() => handleChooseFile('photo')}>
          <FontAwesome5 name="image" color={AppColors.white} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => handleChooseFile('video')}>
          <Ionicons name="ios-videocam" color={AppColors.white} size={20} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <NavigationIcon />

      <View style={styles.postHeader}>
        <Text
          size={20}
          font="BOLD"
          color={AppColors.green}
          style={{ width: '80%', textAlign: 'center' }}
        >
          Create New Post
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSubmitPost}>
          <Text size={18} font="BOLD" color={AppColors.white}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          {isVideo ? (
            <View>
              <Video
                paused
                source={{ uri: file.uri }}
                resizeMode="cover"
                style={{ width: '100%', height: 220 }}
              />
              {renderActionButtons()}
            </View>
          ) : (
            <ImageBackground
              source={file?.uri ? { uri: file?.uri } : images.bgPlaceholder}
              style={styles.bgImage}
            >
              {renderActionButtons()}
            </ImageBackground>
          )}

          <View style={styles.postContent}>
            <TextInput
              placeholder="Enter your post's title *"
              placeholderTextColor={AppColors.green}
              value={postTitle}
              onChangeText={setPostTitle}
              style={styles.inputTitle}
            />

            <TextInput
              placeholder="Start writing your post..."
              multiline
              placeholderTextColor={AppColors.black80}
              value={postBody}
              onChangeText={setPostBody}
              style={styles.inputBody}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: AppColors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bgImage: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: AppColors.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  inputTitle: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 18,
    color: AppColors.green,
    marginTop: 5,
  },
  inputBody: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    color: AppColors.black,
    marginTop: 5,
  },
  postContent: {
    padding: 10,
  },
});

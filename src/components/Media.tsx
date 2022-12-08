import React, { useCallback, useState } from 'react';
import { ImageBackground, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppColors, SIZES } from '~/constants/app';
import { selectAuthenticatedUser } from '~/modules/authentication/selectors';
import { selectSelectedItem } from '~/modules/feed/selectors';
import { useAppSelector } from '~/store/hooks';
import { isIOS } from '~/utils/platforms';

interface IFile extends File {
  uri: string;
}

type Props = {
  isEditable: boolean;
};

export const Media: React.VFC<Props> = ({ isEditable }) => {
  const { data } = useAppSelector(selectSelectedItem);
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const [file, setFile] = useState<IFile | null>(null);

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
    [file],
  );

  return (
    <ImageBackground source={{ uri: data?.imageUrl }} style={styles.bgImage}>
      {data?.ownerId === authenticatedUser?._id && isEditable && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.icon} onPress={() => handleChooseFile('photo')}>
            <FontAwesome5 name="image" color={AppColors.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => handleChooseFile('video')}>
            <Ionicons name="ios-videocam" color={AppColors.white} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

// return (
//   <Video
//     source={{ uri: data?.videoUrl }}
//     resizeMode="cover"
//     controls
//     style={{ width: '100%', height: 220 }}
//   />
// );

const styles = StyleSheet.create({
  bgImage: {
    height: (SIZES.width / 16) * 9,
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
});

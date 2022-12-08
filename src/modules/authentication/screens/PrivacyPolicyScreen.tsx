import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';

import { AppColors, SIZES } from '~/constants/app';
import { API_URL } from '~/constants/env';
import { useTranslation } from '~/i18n';
import { PrivacyPolicyScreenNavigationProp, SCREENS } from '~/types/screens';
import { Button, LoadingStateView, NavigationIcon } from '~/ui';

export const PrivacyPolicyScreen: React.VFC = () => {
  const { t } = useTranslation();
  const systemFonts = [...defaultSystemFonts, 'TitilliumWeb-Regular'];
  const [source, setSource] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();

  useEffect(() => {
    async function createMarkup(): Promise<void> {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/privacy-policy`);
        const backendHtmlString = await response.text();

        setSource(backendHtmlString);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
    createMarkup();
  }, []);

  if (isLoading) {
    return <LoadingStateView />;
  }

  return (
    <>
      <NavigationIcon />
      <ScrollView style={{ backgroundColor: AppColors.white }}>
        <RenderHtml
          source={{ html: source }}
          contentWidth={SIZES.width}
          // @ts-ignore
          tagsStyles={tagsStyles}
          systemFonts={systemFonts}
          ignoredDomTags={['link']}
        />

        <Button
          text={t('auth:privacyPolicy:acceptBtn')}
          containerStyle={styles.button}
          onPress={() => navigation.navigate(SCREENS.HOME_TAB)}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    marginBottom: 20,
  },
});

const tagsStyles = {
  body: {
    fontFamily: 'TitilliumWeb-Regular',
    paddingHorizontal: SIZES.padding,
    marginTop: -20,
  },
  h1: {
    alignSelf: 'center',
    color: AppColors.primary,
  },
  h2: {
    color: AppColors.primary,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  p: {
    color: AppColors.black,
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'justify',
  },
  a: {
    color: '#9b4dca',
    textDecorationLine: 'none',
  },
  ul: {
    marginTop: 0,
    paddingLeft: 0,

    marginBottom: 20,

    listStyleType: 'circle',

    marginLeft: 10,
    fontSize: 16,
  },
  li: {
    marginLeft: 10,
  },
};

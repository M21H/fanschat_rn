import i18next, { i18n, LanguageDetectorModule, StringMap, TOptions } from 'i18next';
import { initReactI18next, TFunction, useTranslation as useTranslationBase } from 'react-i18next';
import { findBestAvailableLanguage } from 'react-native-localize';

const translations = {
  en: require('./translations/en.json'),
};

const availableTranslations = Object.keys(translations);

const defaultLanguage = { languageTag: 'en', isRTL: false };

const languageDetector: LanguageDetectorModule = {
  init: () => {},
  type: 'languageDetector',
  detect: () => (findBestAvailableLanguage(availableTranslations) ?? defaultLanguage).languageTag,
  cacheUserLanguage: () => {},
};

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  debug: __DEV__,
  resources: translations,
  defaultNS: 'common',
});

export interface CustomTFunction {
  (key: string, options?: TOptions<StringMap> | string): string;
}

type UseTranslationResponse = [TFunction, i18n, boolean] & {
  t: CustomTFunction;
  i18n: i18n;
  ready: boolean;
};

export const useTranslation = (
  ...params: Parameters<typeof useTranslationBase>
): UseTranslationResponse => useTranslationBase(...params);

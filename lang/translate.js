
import i18n from 'i18n-js'
import {Platform, NativeModules} from 'react-native'

i18n.translations = {
  en_US: require('./en_US.json'), 
  es_ES: require('./es_ES.json'),
  pt_BR: require('./pt_BR.json'),
}

export const getLang = () => {
  const deviceLang =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return deviceLang
};

export const setLang = lang => {
  i18n.defaultLocale = 'pt-BR';
  if (i18n.translations.hasOwnProperty(lang)) {
    i18n.locale = lang;
  }
}

export const translate = scope => {
  const result = i18n.t(scope);
  return result;
};
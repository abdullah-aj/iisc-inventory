import React, {createContext, ReactNode, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {LANG_DATA_KEY} from '../utils/constants';
import {NativeModules, Platform} from 'react-native';

type Lang = 'en' | 'ar';

type LangContext = {
  getLang: () => Lang;
  setLang: (value: Lang) => Promise<boolean>;
};

type LangProviderProps = {
  children: ReactNode;
};

export const LangContext = createContext({} as LangContext);

export const LangProvider = ({children}: LangProviderProps) => {
  const {getItem, setItem} = useAsyncStorage(LANG_DATA_KEY);

  const [langValue, setLangValue] = useState<Lang>(() => getLocale());

  useEffect(() => {
    (async () => {
      const data = await getItem();
      if (data) {
        setLangValue(JSON.parse(data));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLang = () => {
    return langValue;
  };

  const setLang = async (value: Lang) => {
    await setItem(JSON.stringify(value));
    setLangValue(value);
    return Promise.resolve(true);
  };

  return (
    <LangContext.Provider
      value={{
        getLang,
        setLang,
      }}>
      {children}
    </LangContext.Provider>
  );
};

const getLocale = () => {
  let locale = '';
  if (Platform.OS === 'android') {
    locale = NativeModules.I18nManager.localeIdentifier;
  } else if (Platform.OS === 'ios') {
    locale =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
  }
  return locale.toLocaleLowerCase().includes('ar') ? 'ar' : 'en';
};

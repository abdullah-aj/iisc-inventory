/* eslint-disable dot-notation */
import React, {
  createContext,
  useMemo,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../utils/constants';
import {PRODUCT_KEY} from './useProduct';
import axios from 'axios';
import {API_URL, TOKEN} from '../utils/constants';

export type UserType = {
  username: string;
  password: string;
  token?: string;
};

type AuthContext = {
  user: UserType | null;
  loginAction: (data: UserType) => Promise<boolean>;
  logoutAction: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

const USER_DATA_KEY = `${STORAGE_KEY}-USER`;

export const AuthProvider = ({children}: AuthProviderProps) => {
  const {getItem, setItem} = useAsyncStorage(USER_DATA_KEY);

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getItem();
      if (data) {
        setUser(JSON.parse(data));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call this function when you want to authenticate the user
  const loginAction = async (data: UserType) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
    axios.defaults.headers.common['accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    const res = await axios.post(`${API_URL}/account/login`, {
      username: data.username,
      password: data.password,
    });
    console.log({
      username: data.username,
      password: data.password,
    });
    console.log(res?.data?.token);

    if (res?.data?.success === false) {
      return Promise.resolve(false);
    } else {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res?.data?.token}`;
      setUser({...data, token: res?.data?.token});
      await setItem(JSON.stringify(data));
      return Promise.resolve(true);
    }
  };

  // call this function to sign out logged in user
  const logoutAction = async () => {
    setUser(null);
    axios.defaults.headers.common['Authorization'] = '';
    await AsyncStorage.clear();
    await AsyncStorage.removeItem(USER_DATA_KEY);
    await AsyncStorage.removeItem(PRODUCT_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      loginAction,
      logoutAction,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

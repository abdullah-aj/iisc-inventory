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

type User = {
  username: string;
};

type AuthContext = {
  user: User | null;
  loginAction: (data: User) => Promise<void>;
  logoutAction: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const {getItem, setItem} = useAsyncStorage(`${STORAGE_KEY}-USER`);

  const [user, setUser] = useState<User | null>(null);

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
  const loginAction = async (data: User) => {
    setUser(data);
    await setItem(JSON.stringify(data));
  };

  // call this function to sign out logged in user
  const logoutAction = async () => {
    setUser(null);
    await AsyncStorage.clear();
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

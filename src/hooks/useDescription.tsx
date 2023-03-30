import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../utils/constants';

type Description = {
  value: string;
  label: string;
};

type DescriptionContext = {
  description: Description[];
  addDescription: (data: Description[]) => void;
};

type DescriptionProviderProps = {
  children: ReactNode;
};

const DescriptionContext = createContext({} as DescriptionContext);

export const useDescription = () => {
  return useContext(DescriptionContext);
};

export const DESCRIPTION_KEY = `${STORAGE_KEY}-DESCRIPTION`;

export const DescriptionProvider = ({children}: DescriptionProviderProps) => {
  const {getItem, setItem} = useAsyncStorage(DESCRIPTION_KEY);

  const [description, setDescription] = useState<Description[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getItem();
      if (data) {
        setDescription(JSON.parse(data));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addDescription = async (data: Description[]) => {
    setDescription(data);
    await setItem(JSON.stringify(data));
  };

  return (
    <DescriptionContext.Provider
      value={{
        description,
        addDescription,
      }}>
      {children}
    </DescriptionContext.Provider>
  );
};

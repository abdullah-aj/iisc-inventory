import {useContext} from 'react';
import {LangContext} from '../contexts/LangContext';

export const useLang = () => {
  return useContext(LangContext);
};

/* eslint-disable dot-notation */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PublicRoutes from './public';
import DrawerNavigation from './drawer';
import {Splash} from '../pages/Splash';
import {useAuth} from '../hooks/useAuth';
import axios from 'axios';
import {TOKEN} from '../utils/constants';

const Router: React.FC = () => {
  const {user} = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!!user && user.username) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        user.token ? user.token : TOKEN
      }`;
      axios.defaults.headers.common['accept'] = 'application/json';
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Splash />
      ) : (
        <NavigationContainer>
          {loggedIn ? <DrawerNavigation /> : <PublicRoutes />}
        </NavigationContainer>
      )}
    </>
  );
};

export default Router;

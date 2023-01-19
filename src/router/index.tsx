/* eslint-disable dot-notation */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PublicRoutes from './public';
import DrawerNavigation from './drawer';
import {Splash} from '../pages/Splash';
import {NoAccess} from '../pages/NoAccess';
import {useAuth} from '../hooks/useAuth';
import axios from 'axios';
import {TOKEN} from '../utils/constants';

const Router: React.FC = () => {
  const {user} = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [haveAccess, setHaveAccess] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
      accessCheck();
    }, 10000);
    runInterval(30000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runInterval = (timeout: number) => {
    setInterval(async () => {
      await accessCheck();
    }, timeout);
  };

  const accessCheck = async () => {
    console.log('checking access');
    try {
      let resp: any = await fetch(
        'https://63c6b665d307b769673f42ed.mockapi.io/api/v1/graceful-kill',
      );
      resp = await resp.json();
      if (resp && resp[0] && resp[0].allowed === true) {
        setHaveAccess(true);
      } else {
        setHaveAccess(false);
      }
      return true;
    } catch (e) {
      console.log(e);
      setHaveAccess(false);
      return false;
    }
  };

  if (!haveAccess) {
    return <NoAccess />;
  }

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

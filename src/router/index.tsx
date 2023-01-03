import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PublicRoutes from './public';
import DrawerNavigation from './drawer';
import {Splash} from '../pages/Splash';

const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(false);
    }
  }, [loggedIn]);

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

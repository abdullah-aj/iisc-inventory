import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PublicRoutes from './public';
import DrawerNavigation from './drawer';
import {Splash} from '../pages/Splash';
import {useAuth} from '../hooks/useAuth';

const Router: React.FC = () => {
  const {user} = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!!user && user.username) {
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

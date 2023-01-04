import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../pages/Login';
import {Splash} from '../pages/Splash';

const PublicRoutes: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'splash'} component={Splash} />
        <Stack.Screen name={'login'} component={Login} />
      </Stack.Navigator>
    </>
  );
};

export default PublicRoutes;

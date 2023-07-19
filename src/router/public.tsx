import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../pages/Login';
import {Splash} from '../pages/Splash';
import { WelcomeScreen } from '../pages/WelcomeScreen';

const PublicRoutes: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'splash'} component={Splash} />
        <Stack.Screen name={'login'} component={Login} />
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
      </Stack.Navigator>
    </> 
  );
};

export default PublicRoutes;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../pages/Login';
import {Splash} from '../pages/Splash';

const PublicRoutes: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'login'} component={Login} />
        <Stack.Screen name={'splash'} component={Splash} />
      </Stack.Navigator>
    </>
  );
};

export default PublicRoutes;

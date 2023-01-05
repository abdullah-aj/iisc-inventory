import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../../pages/Home';
import {Notifications} from '../../pages/Notifications';
import {BarcodePage} from '../../pages/BarcodePage';

const StackNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'home'} component={Home} />
        <Stack.Screen name={'notifications'} component={Notifications} />
        <Stack.Screen name={'barcode'} component={BarcodePage} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

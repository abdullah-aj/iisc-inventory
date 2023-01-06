import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../../pages/Home';
import {Notifications} from '../../pages/Notifications';
import {BarcodePage} from '../../pages/BarcodePage';
import {ProductImageList} from '../../pages/ProductImageList';
import {CaptureImage} from '../../pages/CaptureImage';

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
        <Stack.Screen name={'productImageList'} component={ProductImageList} />
        <Stack.Screen name={'captureImage'} component={CaptureImage} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

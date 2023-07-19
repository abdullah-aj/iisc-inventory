import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../../pages/Home';
import {Notifications} from '../../pages/Notifications';
import {BarcodePage} from '../../pages/BarcodePage';
import {ProductImageList} from '../../pages/ProductImageList';
import {CaptureImage} from '../../pages/CaptureImage';
import {TypeSelection} from '../../pages/TypeSelection';
import {BioData} from '../../pages/BioData';
import {GeoData} from '../../pages/GeoData';
import {AssetData} from '../../pages/AssetData';
import {EntityData} from '../../pages/EntityData';
import {FinishScreen} from '../../pages/FinishScreen';
import {MachineData} from '../../pages/MachineData';
import {IntangibleData} from '../../pages/IntangibleData';
import {DataFields} from '../../pages/DataFields';
import {Language} from '../../pages/Language';
import { WelcomeScreen } from '../../pages/WelcomeScreen';

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
        <Stack.Screen name={'typeSelection'} component={TypeSelection} />
        <Stack.Screen name={'bioData'} component={BioData} />
        <Stack.Screen name={'geoData'} component={GeoData} />
        <Stack.Screen name={'assetData'} component={AssetData} />
        <Stack.Screen name={'entityData'} component={EntityData} />
        <Stack.Screen name={'finishScreen'} component={FinishScreen} />
        <Stack.Screen name={'machineData'} component={MachineData} />
        <Stack.Screen name={'intangibleData'} component={IntangibleData} />
        <Stack.Screen name={'dataFields'} component={DataFields} />
        <Stack.Screen name={'language'} component={Language} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from '../tab';
import DrawerMenu from './Menu/Menu';

const DrawerNavigation: React.FC = () => {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
        }}
        drawerContent={props => <DrawerMenu {...props} />}>
        <Drawer.Screen name="mainScreen" component={TabNavigation} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;

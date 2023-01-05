import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import StackNavigation from '../stack';
import {Notifications} from '../../pages/Notifications';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../assets/Theme';

const TabNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        initialRouteName="homeStack"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: '#c84242',
          tabBarInactiveTintColor: '#6a2525',
          tabBarShowLabel: false,
          tabBarStyle: {borderTopWidth: 0, height: 70},
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'profile') {
              return (
                <Icon
                  name="account"
                  type="material-community"
                  color={color}
                  size={focused ? size + 7 : size}
                />
              );
            }
            if (route.name === 'homeStack') {
              return (
                <Icon
                  name="home"
                  type="feather"
                  color={color}
                  size={focused ? size + 7 : size}
                />
              );
            }

            if (route.name === 'notification') {
              return (
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  color={color}
                  size={focused ? size + 7 : size}
                />
              );
            }
          },
          tabBarBackground: () => <View style={styles.bottomBarContainer} />,
        })}>
        <Tab.Screen name="profile" component={Notifications} />
        <Tab.Screen name="homeStack" component={StackNavigation} />
        <Tab.Screen name="notification" component={Notifications} />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  bottomBarContainer: {
    backgroundColor: Colors.primary_color_1,
    height: '100%',
  },
});

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import StackNavigation from '../stack';
import {Notifications} from '../../pages/Notifications';

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
          tabBarStyle: {borderTopWidth: 0},
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
          tabBarBackground: () => (
            <View style={styles.bottomBarContainer}>
              {/* <BottomColors style={styles.bottomColors} /> */}
            </View>
          ),
        })}>
        {/* <Tab.Screen name="profile" component={Profile} /> */}
        <Tab.Screen name="homeStack" component={StackNavigation} />
        <Tab.Screen name="notification" component={Notifications} />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  bottomBarContainer: {
    backgroundColor: '#fff',
    height: '100%',
    width: 200,
  },
  bottomColors: {
    alignSelf: 'center',
    marginTop: -2,
  },
});

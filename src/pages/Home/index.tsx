import {Button} from '@rneui/base';
import React from 'react';
import {Text, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

export const Home = () => {
  const {logoutAction} = useAuth();
  return (
    <View
      style={{
        backgroundColor: '#333',
      }}>
      <Text>Home Screen</Text>
      <Button onPress={logoutAction}>Logout</Button>
    </View>
  );
};

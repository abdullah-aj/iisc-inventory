import {Button} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, Text, useColorScheme, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

// type User = {
//   username: string;
//   password: string;
// };

export const Login = () => {
  const {loginAction} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  const [loading, setLoading] = useState<boolean>(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#eee',
  };

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      loginAction({username: 'Hello User'});
      setLoading(false);
    }, 1000);
  };

  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? '#333' : '#eee',
          }}>
          <Text>Hello this is an Inventory APP LOGIN</Text>
          {loading && <Text>Loading ...</Text>}
          <Button onPress={handleLogin}>Login</Button>
        </View>
      </ScrollView>
    </View>
  );
};

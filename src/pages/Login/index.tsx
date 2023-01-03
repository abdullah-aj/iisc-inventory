import React from 'react';
import {ScrollView, Text, useColorScheme, View} from 'react-native';

export const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#eee',
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
        </View>
      </ScrollView>
    </View>
  );
};

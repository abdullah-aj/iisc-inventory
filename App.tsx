import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Router from './src/router';
import {AuthProvider} from './src/hooks/useAuth';
import {ThemeProvider, createTheme} from '@rneui/themed';

const App = () => {
  const theme = createTheme({});

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router />
          <Toast />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;

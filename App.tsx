import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Router from './src/router';
import {AuthProvider} from './src/hooks/useAuth';
import {ProductProvider} from './src/hooks/useProduct';
import {ThemeProvider, createTheme} from '@rneui/themed';

const App = () => {
  const theme = createTheme({});

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProductProvider>
            <Router />
            <Toast />
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

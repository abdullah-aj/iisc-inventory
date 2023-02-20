import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Router from './src/router';
import {AuthProvider} from './src/hooks/useAuth';
import {ProductProvider} from './src/hooks/useProduct';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {LangProvider} from './src/contexts/LangContext';

const App = () => {
  const theme = createTheme({});

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProductProvider>
            <LangProvider>
              <Router />
              <Toast />
            </LangProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Router from './src/router';
import {AuthProvider} from './src/hooks/useAuth';
import {ProductProvider} from './src/hooks/useProduct';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {LangProvider} from './src/contexts/LangContext';
import {I18nManager} from 'react-native';
import {DescriptionProvider} from './src/hooks/useDescription';

import * as Sentry from '@sentry/react-native';

Sentry.init({ 
  dsn: 'https://cf18deaecbd44b29a87f247ac8be6eb4@o4503958525837312.ingest.sentry.io/4505072636329984', 
});


I18nManager.allowRTL(false);
I18nManager.doLeftAndRightSwapInRTL = false;

const App = () => {
  const theme = createTheme({});

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ProductProvider>
            <LangProvider>
              <DescriptionProvider>
                <Router />
                <Toast />
              </DescriptionProvider>
            </LangProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

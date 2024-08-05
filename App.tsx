import React from 'react';
import { StatusBar, LogBox, Platform } from 'react-native';
import RootStack from './src/navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import Geocode from 'react-geocode';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Context as AppContext, Provider as AppProvider } from './src/context';
import Loading from './src/components/Loading';

import { ToastProvider } from 'react-native-toast-notifications';
import Icons from './src/components/Icons';
import CustomToast from './src/components/Toast/CustomToast';
import CustomToastWithCloseButton from './src/components/Toast/CustomToastWithCloseButton';

LogBox.ignoreAllLogs();

Geocode.setApiKey(process.env.GOOGLE_API_KEY as string);
Geocode.setLanguage('es');
Geocode.setRegion('mx');

console.log("APIKEY"+ process.env.API_KEY);

const App: React.FC = () => {
  const renderSuccesIcon = () => (
    <Icons type="materialCommunity" name="check" color="#fff" size={18} />
  );

  const renderDangerIcon = () => (
    <Icons type="materialCommunity" name="close" color="#fff" />
  );

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Platform.OS === 'ios' ? 'transparent' : 'black'}
        translucent
        networkActivityIndicatorVisible
      />
      <AppProvider>
        <AppContext.Consumer>
          {() => (
            <ToastProvider
              placement="bottom"
              dangerIcon={renderDangerIcon()}
              successIcon={renderSuccesIcon()}
              offset={10}
              renderType={{
                custom_toast: (toast: any) => <CustomToast toast={toast} />,
                with_close_button: (toast: any) => (
                  <CustomToastWithCloseButton toast={toast} />
                ),
              }}>
              <PaperProvider>
                <RootStack />
                <Loading />
              </PaperProvider>
            </ToastProvider>
          )}
        </AppContext.Consumer>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
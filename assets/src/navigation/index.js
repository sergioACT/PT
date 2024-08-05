import React, {useContext, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {Context} from '../context';

const Stack = createStackNavigator();

const Navigation = () => {
  const ref = useRef(null);

  const {isLoggedIn, userDataLoaded, persistentDataLoaded} = useContext(Context);

  const defaultStackSettings = {
    screenOptions: {
      headerShown: false,
    },
    cardShadowEnabled: false,
    defaultNavigationOptions: {
      gestureEnabled: true,
    },
    cardStyleInterpolator: forFade,
  };

  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  if (!userDataLoaded && !persistentDataLoaded) {
    //splashscreen
    return null;
  }

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'} {...defaultStackSettings}>
        <Stack.Screen
          name="Home"
          options={{
            gestureEnabled: false,
            cardStyleInterpolator: forFade,
          }}>
          {() => (
            <Stack.Navigator initialRouteName="HomeScreen" {...defaultStackSettings}>
              <Stack.Screen name="HomeScreen" component={require('./../views/HomeScreen').default} />

              <Stack.Screen
                name="PanicScreen"
                options={{
                  presentation: 'transparentModal',
                  gestureEnabled: false,
                }}
                component={require('./../views/PanicScreen').default}
              />

              {/* User */}
              <Stack.Screen name="UserScreen" component={require('./../views/UserScreen').default} />
              <Stack.Screen name="UpdateDataScreen" component={require('./../views/UserScreen/UpdateDataScreen').default} />
              <Stack.Screen name="ChangePasswordScreen" component={require('./../views/UserScreen/ChangePasswordScreen').default} />

              {/* Reports */}
              <Stack.Screen name="ReportsScreen" component={require('./../views/ReportsScreen').default} />
              <Stack.Screen name="NewReportScreen" component={require('./../views/ReportsScreen/NewReportScreen').default} />
              <Stack.Screen name="MapViewScreen" component={require('./../views/ReportsScreen/NewReportScreen/MapView').default} />

              <Stack.Screen name="ImageModalScreen" options={{presentation: 'modal'}} component={require('./../views/ReportsScreen/Details/ImageModalScreen').default} />

              {/* Academy */}
              <Stack.Screen name="AcademyScreen" component={require('./../views/AcademyScreen').default} />

              {/* Suggestion MailBox */}
              <Stack.Screen name="SuggestionMailBoxScreen" component={require('./../views/SuggestionMailboxScreen').default} />

              {/* ViolenciaFamiliarGeneroScreen */}
              <Stack.Screen name="ViolenciaFamiliarGeneroScreen" component={require('./../views/ViolenciaFamiliarGeneroScreen').default} />
            </Stack.Navigator>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Login"
          options={{
            gestureEnabled: false,
            cardStyleInterpolator: forFade,
          }}>
          {() => (
            <Stack.Navigator initialRouteName="NovoOnboardingGettingStarted" {...defaultStackSettings}>
              <Stack.Screen options={{gestureEnabled: false}} name="LoginScreen" component={require('./../views/LoginScreen').default} />

              {/* SignUp */}
              <Stack.Screen name="SignUpScreen" component={require('./../views/SignUpScreen').default} />
            </Stack.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

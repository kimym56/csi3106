import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { authAtom } from './atoms/auth';
import { ScreenName } from './constants';
import { AuthStatus } from './models/auth';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';

const client = new QueryClient();

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={client}>
        <NavigationContainer>
          <Suspense fallback={<SplashScreen />}>
            <RootNavigator />
          </Suspense>
        </NavigationContainer>
        <Toast />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { status } = useAtomValue(authAtom);

  return (
    <Stack.Navigator>
      {status === AuthStatus.INVALID ? (
        <>
          <Stack.Screen name={ScreenName.로그인} options={{ title: '로그인' }} component={LoginScreen} />
          <Stack.Screen name={ScreenName.회원가입} options={{ title: '회원가입' }} component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name={ScreenName.메인} options={{ headerShown: false }} component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
}

function MainNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name={ScreenName.홈} component={HomeScreen} />
    </BottomTab.Navigator>
  );
}

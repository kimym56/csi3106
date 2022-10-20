import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { authAtom } from './atoms/auth';
import { ScreenName } from './constants';
import { AuthStatus } from './models/auth';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyPageScreen from './screens/MyPageScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import { queryClient } from './utils/network';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const bottomTabIcons: Record<string, string> = {
  [ScreenName.홈]: 'home',
  [ScreenName.마이페이지]: 'user',
};

export function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
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
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          const name = bottomTabIcons[route.name];
          return name != null ? <Icon name={name} size={size} color={color} /> : null;
        },
        tabBarShowLabel: false,
      })}
    >
      <BottomTab.Screen name={ScreenName.홈} options={{ headerShown: false }} component={HomeScreen} />
      <BottomTab.Screen name={ScreenName.마이페이지} options={{ headerTitle: '마이페이지' }} component={MyPageScreen} />
    </BottomTab.Navigator>
  );
}

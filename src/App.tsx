import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenName } from './constants';
import { useAuth } from './hooks/auth';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name={ScreenName.메인} options={{ headerShown: false }} component={MainNavigator} />
      ) : (
        <>
          <Stack.Screen name={ScreenName.로그인} options={{ title: '로그인' }} component={LoginScreen} />
          <Stack.Screen name={ScreenName.회원가입} options={{ title: '회원가입' }} component={SignupScreen} />
        </>
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

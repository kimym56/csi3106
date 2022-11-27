import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { MD3LightTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import { authAtom } from './atoms/auth';
import { Colors, ScreenName } from './constants';
import { AuthStatus } from './models/auth';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyPageScreen from './screens/MyPageScreen';
import ShopDetailScreen from './screens/ShopDetailScreen';
import ShopUploadScreen from './screens/ShopUploadScreen';
import SignupScreen from './screens/SignupScreen';
import SplashScreen from './screens/SplashScreen';
import StyleDetailScreen from './screens/StyleDetailScreen';
import StyleUploadScreen from './screens/StyleUploadScreen';
import { queryClient } from './utils/network';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const bottomTabIcons: Record<string, string> = {
  [ScreenName.홈]: 'home',
  [ScreenName.마이페이지]: 'user',
};

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: Colors.ACCENT,
  },
};

export function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider
        settings={{
          icon: (props) => <Icon {...props} />,
        }}
        theme={CombinedDefaultTheme}
      >
        <QueryClientProvider client={queryClient}>
          <NavigationContainer theme={CombinedDefaultTheme}>
            <Suspense fallback={<SplashScreen />}>
              <RootNavigator />
            </Suspense>
          </NavigationContainer>
          <Toast />
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { status } = useAtomValue(authAtom);

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTintColor: Colors.ACCENT }}>
      {status === AuthStatus.INVALID ? (
        <>
          <Stack.Screen name={ScreenName.로그인} options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name={ScreenName.회원가입} options={{ headerShown: false }} component={SignupScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name={ScreenName.메인} options={{ headerShown: false }} component={MainNavigator} />
          <Stack.Screen
            name={ScreenName.스타일_상세}
            options={{
              title: 'style 상세',
              headerRight: (props) => <StyleDetailScreen.HeaderRight {...props} />,
            }}
            component={StyleDetailScreen}
          />
          <Stack.Screen
            name={ScreenName.스타일_업로드}
            options={{ title: 'style 업로드' }}
            component={StyleUploadScreen}
          />
          <Stack.Screen name={ScreenName.상점_상세} options={{ title: 'shop 상세' }} component={ShopDetailScreen} />
          <Stack.Screen name={ScreenName.상점_업로드} options={{ title: 'shop 업로드' }} component={ShopUploadScreen} />
        </>
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

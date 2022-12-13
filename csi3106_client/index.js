import { AppRegistry } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { name as appName } from './app.json';
import { App } from './src/app';

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener(({ isInternetReachable }) => {
    setOnline(isInternetReachable === true);
  });
});

AppRegistry.registerComponent(appName, () => App);

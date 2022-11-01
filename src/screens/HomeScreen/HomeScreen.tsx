import React from 'react';
import { Text, View } from 'react-native';
import { Portal } from 'react-native-paper';
import MenuButton from './MenuButton';

export default function HomeScreen() {
  return (
    <Portal.Host>
      <View>
        <Text>home</Text>
        <MenuButton />
      </View>
    </Portal.Host>
  );
}

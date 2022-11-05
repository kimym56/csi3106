import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Portal } from 'react-native-paper';
import { ScreenName } from '../../constants';
import ShopListScreen from '../ShopListScreen';
import StyleListScreen from '../StyleListScreen';
import MenuButton from './MenuButton';
import ProfileDisplay from './ProfileDisplay';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ProfileDisplay />
        </View>
        <Tab.Navigator>
          <Tab.Screen name={ScreenName.스타일_목록} options={{ title: 'Styles' }} component={StyleListScreen} />
          <Tab.Screen name={ScreenName.상점_목록} options={{ title: 'Shop' }} component={ShopListScreen} />
        </Tab.Navigator>
        <MenuButton />
      </View>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

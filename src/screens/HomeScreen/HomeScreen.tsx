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
    backgroundColor: '#fff',
  },
  topContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 5,
  },
});

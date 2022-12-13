import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Portal } from 'react-native-paper';
import ProfileDisplay from '../../components/ProfileDisplay';
import { ScreenName } from '../../constants';
import { useMyShopListQuery } from '../../hooks/shop';
import { useMyStyleListQuery } from '../../hooks/style';
import { useCurrentUserQuery } from '../../hooks/user';
import ShopListScreen from '../ShopListScreen';
import StyleListScreen from '../StyleListScreen';
import MenuButton from './MenuButton';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  const profileQuery = useCurrentUserQuery();
  const { data: styleData } = useMyStyleListQuery();
  const { data: shopData } = useMyShopListQuery();

  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ProfileDisplay query={profileQuery} isMyself={true} />
        </View>
        <Tab.Navigator>
          <Tab.Screen name={ScreenName.스타일_목록} options={{ title: 'Styles' }}>
            {() => <StyleListScreen data={styleData} />}
          </Tab.Screen>
          <Tab.Screen name={ScreenName.상점_목록} options={{ title: 'Shop' }}>
            {() => <ShopListScreen data={shopData} />}
          </Tab.Screen>
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

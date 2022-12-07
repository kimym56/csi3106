import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Portal } from 'react-native-paper';
import ProfileDisplay from '../../components/ProfileDisplay';
import { ParamList, ScreenName } from '../../constants';
import { useOtherShopListQuery } from '../../hooks/shop';
import { useOtherStyleListQuery } from '../../hooks/style';
import { useOtherUserQuery } from '../../hooks/user';
import ShopListScreen from '../ShopListScreen';
import StyleListScreen from '../StyleListScreen';

const Tab = createMaterialTopTabNavigator();

export default function OtherUserScreen() {
  const { params } = useRoute<RouteProp<ParamList, ScreenName.다른사람>>();

  const profileQuery = useOtherUserQuery(params.id);
  const { data: styleData } = useOtherStyleListQuery(params.id);
  const { data: shopData } = useOtherShopListQuery(params.id);

  return (
    <Portal.Host>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ProfileDisplay query={profileQuery} isMyself={false} />
        </View>
        <Tab.Navigator>
          <Tab.Screen name={ScreenName.스타일_목록} options={{ title: 'Styles' }}>
            {() => <StyleListScreen data={styleData} />}
          </Tab.Screen>
          <Tab.Screen name={ScreenName.상점_목록} options={{ title: 'Shop' }}>
            {() => <ShopListScreen data={shopData} />}
          </Tab.Screen>
        </Tab.Navigator>
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

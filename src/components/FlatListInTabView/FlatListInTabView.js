import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { client } from '../../utils/network';
const SLIDER_WIDTH = Dimensions.get('window').width;

export default function FlatListInTabView() {
  const [index, setIndex] = useState(0);
  const getClosetData = async () => {
    try {
      const closetData = await client.get('api/v1/closet/shop').json();
      console.log('closetData : ', closetData);
      return closetData;
    } catch (error) {
      console.log('error', error.response.status);
      throw new Error('Something went wrong on API server! - getData');
    }
  };
  var DATA = getClosetData();
  const [routes] = useState([
    { key: 'Style', title: 'Style' },
    { key: 'Shop', title: 'Shop' },
  ]);
  const StyleRoute = () => (
    <View style={{ flex: 0.5, borderWidth: 2 }}>
      <FlatList
        data={DATA}
        renderItem={({ index }) => (
          <View style={styles.flatView}>
            <TouchableOpacity>
              <Image style={styles.imageStyle} source={DATA[index].images} />
            </TouchableOpacity>
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(index) => index.toString()}
      />
    </View>
  );
  const ShopRoute = () => <View />;

  const renderScene = SceneMap({
    Style: StyleRoute,
    Shop: ShopRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => <Text style={{ color: 'black', bottom: 10 }}>{route.title}</Text>}
      indicatorStyle={{ backgroundColor: '#7E7E7E' }}
      style={{ height: 36, backgroundColor: 'white' }}
    />
  );

  const layout = useWindowDimensions();
  return (
    <View style={{ flex: 1, borderWidth: 2 }}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatView: {
    flex: 1,
    flexDirection: 'column',
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SLIDER_WIDTH / 3,
    height: ((SLIDER_WIDTH / 3) * 4) / 3,
  },
});

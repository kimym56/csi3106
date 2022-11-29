import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import PaginationDot from 'react-native-animated-pagination-dot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Divider, IconButton } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import Tag from '../../components/Tag';
import { IMAGE_URL_PREFIX, ParamList, ScreenName } from '../../constants';
import { useShopQuery } from '../../hooks/shop';
export default function ShopDetailScreen() {
  const { params } = useRoute<RouteProp<ParamList, ScreenName.상점_상세>>();
  const query = useShopQuery(params.clothesId);
  const DATA = [query.data?.frontImagePath, query.data?.backImagePath, query.data?.detailImagePath];
  const width = 264;

  return query.data == null ? (
    <ActivityIndicator />
  ) : (
    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column' }}>
      <GestureHandlerRootView>
        <View style={{ alignItems: 'center' }}>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={true}
            autoPlayInterval={3000}
            data={DATA}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, borderRadius: 8 }}>
                <Image source={{ uri: `${IMAGE_URL_PREFIX}${item}` }} style={{ flex: 1, borderRadius: 8 }} />
                <View style={{ bottom: 24, alignSelf: 'center' }}>
                  <PaginationDot activeDotColor={'#6600FF'} curPage={index} maxPage={DATA.length} />
                </View>
              </View>
            )}
          />
        </View>
        <Divider bold={true} style={{ marginHorizontal: 16, marginBottom: 4 }} />
        <View style={{ marginVertical: 12, marginHorizontal: 24 }}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <Text>{query.data.owner.owner_name}님</Text>
            {query.data.soldout == true ? (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton icon="tag" size={18} style={{ margin: 0 }} />
                <Text>거래 완료</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton icon="tag" size={16} style={{ margin: 0, padding: 0 }} />
                <Text>{query.data.price}원</Text>
              </View>
            )}
          </View>
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>{query.data.title}</Text>
          <Tag.List style={styles.tagContainer}>
            <Tag.Item title={query.data.type} />
          </Tag.List>
          <Text style={{ color: 'black' }}>{query.data.detail}</Text>
        </View>
        <Divider bold={true} style={{ marginHorizontal: 16, marginBottom: 16 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text>댓글</Text>
        </View>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    marginVertical: 10,
  },
});

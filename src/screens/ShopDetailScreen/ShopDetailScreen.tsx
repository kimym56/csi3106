import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import PaginationDot from 'react-native-animated-pagination-dot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Divider, IconButton } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Feather';
import ProfileImage from '../../components/ProfileImage';
import Tag from '../../components/Tag';
import { IMAGE_URL_PREFIX, ParamList, ScreenName, TagName } from '../../constants';
import { useShopCommentCreate, useShopCommentQuery, useShopQuery } from '../../hooks/shop';

export default function ShopDetailScreen() {
  const [imageIndex, setImageIndex] = useState<number>();

  const { params } = useRoute<RouteProp<ParamList, ScreenName.상점_상세>>();
  const query = useShopQuery(params.clothesId);
  const { data: comments } = useShopCommentQuery(params.clothesId);
  const DATA = [query.data?.frontImagePath, query.data?.backImagePath, query.data?.detailImagePath];
  const width = 264;

  const [commentWrite, setWrite] = useState(false);
  const [text, setText] = useState('');
  const createCommentQuery = useShopCommentCreate();

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
            onSnapToItem={(index) => {
              setImageIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={{ flex: 1, borderRadius: 8 }}>
                <Image source={{ uri: `${IMAGE_URL_PREFIX}${item}` }} style={{ flex: 1, borderRadius: 8 }} />
              </View>
            )}
          />

          <View style={{ bottom: 24, alignSelf: 'center' }}>
            <PaginationDot activeDotColor={'#6600FF'} curPage={imageIndex ?? 0} maxPage={DATA.length} />
          </View>
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
            <Tag.Item title={TagName[query.data.type as keyof typeof TagName].kor} />
          </Tag.List>
          <Text style={{ color: 'black' }}>{query.data.detail}</Text>
        </View>
        <Divider bold={true} style={{ marginHorizontal: 16, marginBottom: 16 }} />

        {commentWrite == true ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={{ fontSize: 14, padding: 0 }}
              onChangeText={setText}
              value={text}
              placeholder="댓글을 입력하세요"
            />
            <TouchableOpacity
              onPress={() => {
                setWrite(false);
                createCommentQuery.mutate({ id: params.clothesId, content: text });
              }}
            >
              <Icon name={'send'} size={24} style={{ marginVertical: 6 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}
          >
            {comments != undefined ? (
              <Text style={{ color: 'black' }}>댓글 {Object.values(comments)?.length} 개</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                setWrite(true);
              }}
            >
              <Text style={{ color: 'black' }}>댓글 쓰기</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 150 }}>
          <FlatList
            data={comments}
            renderItem={({ item }) => {
              return (
                <View style={styles.commentContainer}>
                  <ProfileImage />
                  <View style={styles.textContainer}>
                    <Text style={{ color: '#6600FF' }}>{item.userId}</Text>
                    <Text style={{ marginTop: 10, color: 'black' }}>{item.comment}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    marginVertical: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    marginHorizontal: 10,
    marginVertical: 12,
  },
  searchContainer: {
    maxHeight: 36,
    borderWidth: 0.5,
    borderColor: '#d8d8d8',
    borderStyle: 'solid',
    borderRadius: 20,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

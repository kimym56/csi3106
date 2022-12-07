import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IMAGE_URL_PREFIX, ScreenName } from '../../constants';
import { useMarketListQuery } from '../../hooks/market';
import { useWishlistDelete, useWishlistPut, useWishlistQuery } from '../../hooks/wishlist';

export default function MarketListScreen(props) {
  const { navigate } = useNavigation();
  const { data: DATA } = useMarketListQuery();
  const wishlist = useWishlistQuery();

  const idList = [];
  const putWishlist = useWishlistPut({
    onSuccess() {
      console.log('put success');
    },
  });
  const deleteWishlist = useWishlistDelete({
    onSuccess() {
      console.log('delete success');
    },
  });
  const handleWish = (id) => {
    if (idList.includes(id) == false) putWishlist.mutate(id);
    else deleteWishlist.mutate(id);
  };

  if (wishlist.status == 'success') {
    Object.entries(wishlist.data).map(([, item]) => idList.push(item.id));
  }
  var filteredDATA;
  switch (props.filterValue) {
    case 1:
      filteredDATA = DATA.filter((v) => v.type == 'a shortsleeve' || v.type == 'a shirts' || v.type == 'a longsleeve');
      break;
    case 2:
      filteredDATA = DATA.filter(
        (v) => v.type == 'a jacket' || v.type == 'a padding' || v.type == 'a coat' || v.type == 'jacket',
      );
      break;
    case 3:
      filteredDATA = DATA.filter((v) => v.type == 'a onepiece');
      break;
    case 4:
      filteredDATA = DATA.filter((v) => v.type == 'a skirt');
      break;
    case 5:
      filteredDATA = DATA.filter((v) => v.type == 'pants');
      break;
    case 6:
      filteredDATA = DATA.filter((v) => v.type == 'shoes');
      break;
    case 7:
      filteredDATA = DATA.filter((v) => v.type == 'acc');
      break;
    case 8:
      filteredDATA = DATA.filter((v) => v.type == 'bag');
      break;
    default:
      filteredDATA = DATA;
  }
  filteredDATA = filteredDATA?.filter((v) => v.price >= props.price[0] && v.price < props.price[1]);
  if (props.color != 'N/A') filteredDATA = filteredDATA?.filter((v) => v.color == props.color);
  if (props.text != undefined) filteredDATA = filteredDATA?.filter((v) => v.title.indexOf(props.text) != -1);
  // console.log('filtered', filteredDATA);
  if (wishlist.status == 'loading') return <ActivityIndicator color={'#6600ff'} />;
  else
    return (
      <View
        style={{
          marginTop: 16,
          flex: 1,
          marginHorizontal: 16,
        }}
      >
        <FlatList
          data={filteredDATA}
          renderItem={({ item }) => (
            <View style={styles.flatView}>
              <TouchableOpacity onPress={() => navigate(ScreenName.상점_상세, { clothesId: item.id })}>
                <View style={styles.imageStyle}>
                  <Image
                    source={{ uri: `${IMAGE_URL_PREFIX}${item.frontImagePath}` }}
                    style={{ flex: 1, borderRadius: 8 }}
                  />
                  {idList.includes(item.id) == true ? (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 4,
                        top: 4,
                      }}
                      onPress={() => handleWish(item.id)}
                    >
                      <Icon name={'star'} size={24} color={'#ffea00'} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 4,
                        top: 4,
                      }}
                      onPress={() => handleWish(item.id)}
                    >
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="star" size={24} color={'white'} style={{ position: 'absolute' }} />
                        <Icon
                          name="star-o"
                          size={26}
                          color={'f8f9fa'}
                          style={{ positon: 'absolute', top: 0, left: 0 }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>

              <View style={{ paddingHorizontal: 6, paddingTop: 4, paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => navigate(ScreenName.다른사람, { id: item.owner.owner_id })}>
                  <Text style={{ fontSize: 12, fontWeight: '400' }}>{item.owner.owner_name}</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: '800', color: 'black' }}>{item.title}</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', color: 'black' }}>{item.price.toLocaleString()}원</Text>
              </View>
            </View>
          )}
          numColumns={2}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  flatView: {
    flex: 1 / 2,
    flexDirection: 'column',
    alignContent: 'center',
  },
  imageStyle: {
    height: 160,
    width: 160,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 3,
    borderRadius: 8,
  },
});

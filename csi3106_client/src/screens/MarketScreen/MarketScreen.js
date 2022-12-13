/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Button, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { useMarketListQuery } from '../../hooks/market';
import { useMyStyleListQuery } from '../../hooks/style';
import MarketListScreen from '../MarketListScreen';
import ClassFilter from './ClassFilter';
import ColorModal from './ColorModal';
import PriceModal from './PriceModal';
export default function MarketScreen() {
  // const query = useMarketListQuery({ priceList: sliderValue, type: filterValue, color: '' });
  const [text, setText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState([0, 200000]);
  const [price, setPrice] = useState([0, 200000]);
  const [filterValue, setFilterValue] = useState(0);
  const [color, setColor] = useState('N/A');
  // console.log('query : ', query?.data);
  // 해야될것
  // 내 스타일 필터..
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ClassFilter filterValue={filterValue} setFilterValue={setFilterValue} />
      <Divider bold={true} style={{ marginHorizontal: 16, marginBottom: 4 }} />
      <View style={styles.searchContainer}>
        <TextInput
          style={{ padding: 0, marginLeft: 12, fontSize: 14 }}
          onChangeText={setText}
          value={text}
          placeholder="검색어를 입력하세요 (예. 골덴 바지, 청자켓)"
        />
        <Icon name={'search'} size={24} style={{ marginVertical: 6 }} />
      </View>
      <PriceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        setPrice={setPrice}
      />
      <View style={{ marginHorizontal: 18, flexDirection: 'row', width: 328 }}>
        <View style={{ marginRight: 12 }}>
          {price[0] == 0 && price[1] == 200000 ? (
            <TouchableOpacity style={styles.priceFalse} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ fontSize: 12, color: '#6600ff' }}>가격</Text>
              <Icon name={'chevron-down'} size={18} color={'#6600ff'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.priceTrue} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ marginHorizontal: 6, fontSize: 12, color: 'white' }}>
                {price[0]}원~{price[1]}원
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ColorModal setColor={setColor} modalVisible={colorModalVisible} setModalVisible={setColorModalVisible} />
        <View style={{ marginRight: 12 }}>
          {color == 'N/A' ? (
            <TouchableOpacity style={styles.colorFalse} onPress={() => setColorModalVisible(!colorModalVisible)}>
              <Text style={{ fontSize: 12, color: '#6600ff' }}>색상</Text>
              <Icon name={'chevron-down'} size={18} color={'#6600ff'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.colorTrue} onPress={() => setColorModalVisible(!colorModalVisible)}>
              <Text style={{ fontSize: 12, color: 'white', marginHorizontal: 6 }}>{color}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginRight: 12 }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderColor: '#6600ff',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              width: 82,
              height: 26,
            }}
          >
            <Text style={{ fontSize: 12, color: '#6600ff' }}>내 스타일</Text>
            <Icon name={'chevron-down'} size={18} color={'#6600ff'} />
          </TouchableOpacity>
        </View>
      </View>
      <MarketListScreen filterValue={filterValue} price={price} color={color} text={text} />

      <View />
    </View>
  );
}
const styles = StyleSheet.create({
  selected: { borderColor: '#6600ff', borderStyle: 'solid', borderWidth: 1, borderRadius: 22, width: 44, height: 44 },
  textSelected: { color: '#6600ff' },
  searchContainer: {
    maxHeight: 36,
    borderWidth: 0.5,
    borderColor: '#d8d8d8',
    borderStyle: 'solid',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  priceFalse: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#6600ff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    width: 58,
    height: 26,
  },
  priceTrue: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    height: 26,
  },
  colorFalse: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#6600ff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    width: 58,
    height: 26,
  },
  colorTrue: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#6600ff',
    backgroundColor: '#6600ff',

    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    height: 26,
  },
});

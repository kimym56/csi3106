import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IMAGE_URL_PREFIX } from '../../constants';

export default function ShopItem({ data }) {
  return (
    <View>
      <Image style={styles.imageStyle} source={{ uri: `${IMAGE_URL_PREFIX}${data.frontImagePath}` }} />
      <View style={styles.textContainer}>
        <Text>{data.owner.owner_name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.price}>{data.price}원</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 1,
  },
  textContainer: {
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
});

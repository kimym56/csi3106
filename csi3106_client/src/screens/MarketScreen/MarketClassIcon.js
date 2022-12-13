import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MarketClassIcon(props) {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={props.filterValue == props.value ? styles.selected : { borderRadius: 22, width: 44, height: 44 }}
        onPress={() => {
          props.filterValue == props.value ? props.onChange(0) : props.onChange(props.value);
        }}
      >
        <Image
          source={{
            uri: props.link,
          }}
          style={styles.classImage}
        />
      </TouchableOpacity>
      <Text style={props.filterValue == props.value ? styles.textSelected : null}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selected: { borderColor: '#6600ff', borderStyle: 'solid', borderWidth: 1, borderRadius: 22, width: 44, height: 44 },
  classImage: {
    borderRadius: 22,
    width: '100%',
    height: '100%',
  },
  textSelected: { color: '#6600ff' },
});

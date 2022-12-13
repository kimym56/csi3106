import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { Colors } from '../../constants';
function rgbToName(rgb) {
  switch (rgb) {
    case '#C84B47':
      return 'red';
    case '#E38B4B':
      return 'orange';
    case '#FDF390':
      return 'yellow';
    case '#6E4217':
      return 'brown';
    case '#F4ECC7':
      return 'ibory';
    case '#54A440':
      return 'green';
    case '#516DC6':
      return 'blue';
    case '#A466AA':
      return 'purple';
    case '#DD91B8':
      return 'pink';
    case '#000000':
      return 'black';
    case '#B0B0B0':
      return 'gray';
    case '#FFFFFF':
      return 'white';
  }
}
export default function ColorModal(props) {
  const [colorValue, setColorValue] = useState('N/A');
  return (
    <Modal animationType="slide" transparent={true} visible={props.modalVisible} backdropColor="black">
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
        onPress={() => props.setModalVisible(false)}
      />
      <View
        style={{
          position: 'absolute',
          borderWidth: 1,
          top: 370,
          marginHorizontal: 16,
          width: 328,
          height: 150,
          backgroundColor: 'white',
        }}
      >
        <View style={styles.colorContainer}>
          {Object.entries(palette).map(([key, color]) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                if (colorValue != key) setColorValue(key);
                else setColorValue('N/A');
              }}
              style={[styles.color, { backgroundColor: color }, colorValue === key && styles.selected]}
            />
          ))}
        </View>
        <Pressable
          onPress={() => {
            if (colorValue != 'N/A') props.setColor(rgbToName(palette[colorValue]));
            else props.setColor('N/A');
            props.setModalVisible(false);
          }}
          style={{
            borderWidth: 1,
            height: 30,
            width: 80,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            margin: 16,
          }}
        >
          <Text>적용하기</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: 10,
  },
  selected: {
    borderColor: Colors.ACCENT,
    borderWidth: 4,
  },
});
const palette = {
  red: '#C84B47',
  orange: '#E38B4B',
  yellow: '#FDF390',
  brown: '#6E4217',
  ibory: '#F4ECC7',
  green: '#54A440',
  blue: '#516DC6',
  purple: '#A466AA',
  pink: '#DD91B8',
  black: '#000000',
  gray: '#B0B0B0',
  white: '#FFFFFF',
};

import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

export default function PriceModal(props) {
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
        <Text>가격을 설정해 보세요!</Text>
        <Slider
          style={{ flex: 1 }}
          value={props.sliderValue}
          onValueChange={(value) => {
            props.setSliderValue([value[0], value[1]]);
          }}
          minimumValue={0}
          maximumValue={200000}
          step={1000}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TextInput
            value={Number(props.sliderValue[0])}
            onChangeText={(e) => {
              props.setSliderValue([e, props.sliderValue[1]]);
            }}
            keyboardType="number-pad"
            style={{ fontSize: 14, backgroundColor: 'gray', width: 80, height: 30, padding: 0, textAlign: 'center' }}
            placeholder={'' + props.sliderValue[0]}
          />
          <TextInput
            value={Number(props.sliderValue[1])}
            onChangeText={(e) => {
              props.setSliderValue([props.sliderValue[0]], e);
            }}
            keyboardType="number-pad"
            style={{ fontSize: 14, backgroundColor: 'gray', width: 80, height: 30, padding: 0, textAlign: 'center' }}
            placeholder={'' + props.sliderValue[1]}
          />
        </View>
        <Pressable
          onPress={() => {
            props.setPrice(props.sliderValue);
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

const styles = StyleSheet.create({});

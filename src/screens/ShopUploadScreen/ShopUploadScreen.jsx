/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

export default function ShopUploadScreen() {
  const [images, setImages] = useState([
    { id: 0, source: '' },
    { id: 1, source: '' },
    { id: 2, source: '' },
  ]);
  const [title, onChangeTitle] = useState();
  const [description, onChangeDescription] = useState();
  const uploadImage = (index) => {
    ImagePicker.openPicker({ width: 300, height: 400 }).then((ret) => {
      const newImages = images.map((imgs, imgNum) => {
        if (imgNum === index) {
          return { id: imgNum, source: ret };
        } else return imgs;
      });
      setImages(newImages);
    });

    return;
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, margin: 2, flex: 1 }}>
        <Text>1.정면 사진을 올려주세요 (필수)</Text>
        <TouchableOpacity style={{ borderWidth: 1, flex: 1, height: 180 }} onPress={() => uploadImage(0)}>
          <Image
            style={{ flex: 1 }}
            source={
              images[0].source === ''
                ? { uri: 'http://www.ezcopy.net/wp-content/uploads/2018/02/upload-1.png' }
                : { uri: images[0].source.path }
            }
          />
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, margin: 2 }}>
        <Text>2.정면 사진을 올려주세요 (필수)</Text>
        <TouchableOpacity style={{ borderWidth: 1, flex: 1, height: 180 }} onPress={() => uploadImage(1)}>
          <Image
            style={{ flex: 1 }}
            source={
              images[1].source === ''
                ? { uri: 'http://www.ezcopy.net/wp-content/uploads/2018/02/upload-1.png' }
                : { uri: images[1].source.path }
            }
          />
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 20, margin: 2 }}>
        <Text>3.정면 사진을 올려주세요 (필수)</Text>
        <TouchableOpacity style={{ borderWidth: 1, flex: 1, height: 180 }} onPress={() => uploadImage(2)}>
          <Image
            style={{ flex: 1 }}
            source={
              images[2].source === ''
                ? { uri: 'http://www.ezcopy.net/wp-content/uploads/2018/02/upload-1.png' }
                : { uri: images[2].source.path }
            }
          />
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="제목"
          keyboardType="string"
        />
        <TextInput
          style={styles.input2}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="설명"
          keyboardType="string"
        />
      </View>

      <View style={{ height: 40, margin: 10, borderWidth: 1 }}>
        <TouchableOpacity
          onPress={() => {
            console.log('');
          }}
        >
          <Text>다음페이지 or 제출</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input2: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

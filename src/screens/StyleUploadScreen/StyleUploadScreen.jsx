/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

export default function StyleUploadScreen() {
  const [images, setImages] = useState({ id: 0, source: '' });
  const uploadImage = (index) => {
    ImagePicker.openPicker({ width: 300, height: 400 }).then((ret) => {
      setImages({ id: index, source: ret });
      //get tag api
    });

    return;
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, margin: 2, flex: 1 }}>
        <TouchableOpacity style={{ borderWidth: 1, flex: 1, height: 180 }} onPress={() => uploadImage(0)}>
          <Image
            style={{ flex: 1 }}
            source={
              images.source === ''
                ? { uri: 'http://www.ezcopy.net/wp-content/uploads/2018/02/upload-1.png' }
                : { uri: images.source.path }
            }
          />
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40, margin: 10, borderWidth: 1 }}>
        <TouchableOpacity
          onPress={() => {
            console.log('');
          }}
          style={{ flex: 1 }}
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

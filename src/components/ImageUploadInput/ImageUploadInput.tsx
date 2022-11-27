import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Colors } from '../../constants';
import { useImageUploadMutation } from '../../hooks/image';
import { UploadImageResult } from '../../remotes/image';

export interface Props {
  style?: StyleProp<ViewStyle>;
  onSuccess?: (result: UploadImageResult) => void;
}

export default function ImageUploadInput({ style, onSuccess }: Props) {
  const mutation = useImageUploadMutation({ onSuccess });

  async function handleClick() {
    const image = await ImagePicker.openPicker({ width: 1000, height: 1000, cropping: true });
    mutation.mutate(image);
  }

  return (
    <TouchableOpacity style={[style, mutation.status === 'idle' && styles.idle]} onPress={handleClick}>
      {mutation.status !== 'idle' && <Image style={styles.image} source={{ uri: mutation.variables?.path }} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  idle: {
    borderColor: Colors.ACCENT,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: Colors.LIGHTGRAY,
    width: '100%',
    height: '100%',
  },
});

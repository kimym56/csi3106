import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Card } from 'react-native-paper';
import ImageTagInput from '../../components/ImageTagInput';
import ImageUploadInput from '../../components/ImageUploadInput';
import { Colors } from '../../constants';

export default function ShopUploadImageCard() {
  const { watch } = useFormContext();
  const frontImagePath = watch('frontImagePath');

  return (
    <Card mode="elevated" elevation={4} style={styles.container}>
      <Card.Content>
        <Text style={styles.text}>FRONT</Text>
        <Controller
          name="frontImagePath"
          render={({ field: { onChange } }) => (
            <ImageUploadInput
              style={styles.imageContainer}
              onSuccess={(path) => {
                onChange(path.imagePath);
              }}
            />
          )}
        />
        <Controller
          name="type"
          render={({ field: { value, onChange } }) => (
            <ImageTagInput
              imagePath={frontImagePath}
              values={value}
              onChange={(type) => {
                onChange(type);
              }}
            />
          )}
        />

        <Text style={styles.text}>BACK</Text>

        <Controller
          name="backImagePath"
          render={({ field: { onChange } }) => (
            <ImageUploadInput
              style={styles.imageContainer}
              onSuccess={(path) => {
                onChange(path.imagePath);
              }}
            />
          )}
        />

        <Text style={styles.text}>DETAIL</Text>
        <Controller
          name="detailImagePath"
          render={({ field: { onChange } }) => (
            <ImageUploadInput
              style={styles.imageContainer}
              onSuccess={(path) => {
                onChange(path.imagePath);
              }}
            />
          )}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  text: {
    color: Colors.ACCENT,
    marginTop: 16,
    marginBottom: 8,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
});
